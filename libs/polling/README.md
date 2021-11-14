# Polling Module

The polling module provides a factory service, which allows you to create polling tasks declaratively.

## Usage

1. Import the module
2. Inject the factory service
3. Create a polling handle
4. Subscribe/Update handle

### TL;DR

```ts
// register module
@NgModule({
  imports: [
    PollingModule.forChild({
      initialDelay: 0,
      pollingRate: 30_000,
    }),
  ],
})
export class MyModule {}

// use factory
@Component()
export class MyComponent {
  public polling = this.factory.create(() => this.http.get('https://my-domain/api/v1/data'));

  constructor(private factory: PollingFactoryService, private http: HttpClient) {}
}
```

```html
<!-- subscribe to status$ to start polling -->
<div>{{ polling.status$ | async }}</div>
<button (click)="polling.update()">Update immediatly</button>
```

---

### Exhaustive

First register the module with the `forChild` initializer.

```ts
@NgModule({
  imports: [PollingModule.forChild()],
})
export class MyModule {}
```

Then inject the factory service.

```ts
@Injectable()
export class MyService {
  constructor(private pollingFactory: PollingFactoryService) {}
}
```

The factory service can now be used to create polling handles.
Provide an action as first argument.

> Note: An Action is a factory function that returns an Observable.

```ts
const myAction = () => of('action was executed');

@Injectable()
export class MyService {
  public polling = this.pollingFactory.create(myAction);

  constructor(private pollingFactory: PollingFactoryService) {}
}
```

The handle exposes a `status$` Observable and an `update` function.

- Receive updates by subscribing to `status$`.
- Trigger an immediate update by calling `update()`.

> Note: Don't forget to unsubscribe, when your caller is destroyed, or the polling will continue to run.

> Note: Calling `update()` will **not** reset the polling interval.

```ts
@Component()
export class MyComponent {
  constructor(myService: MyService) {
    myService.polling.status$.subscribe(console.log);
    myService.polling.update();
  }
}
```

## Configuration

The module allows configuration of the polling interval as well as the delay until the first execution.

### Module scope

```ts
@NgModule({
  imports: [
    PollingModule.forChild({
      initialDelay: 0, // instantly start polling
      pollingRate: 30_000, // then execute every 30s
    }),
  ],
})
export class MyModule {}
```

### Component scope

```ts
const pollingConfig: Partial<PollingConfig> = {
  initialDelay: 42,
};

@Component({
  providers: [
    {
      provide: PollingConfigToken,
      useValue: pollingConfig,
    },
    // don't forget to provide an instance of the service
    PollingFactoryService,
  ],
})
export class MyComponent {}
```

### Factory scope

```ts
@Injectable()
export class MyService {
  public polling = this.pollingFactory.create(myAction, {
    pollintRate: 42,
  });

  constructor(private pollingFactory: PollingFactoryService) {}
}
```

## Tips

### Actions can be anything

You can schedule arbitrary actions with your factory function.

```ts
const fetchData = () => http.get('https://my-domain.com/api/v1/data');
const logSomething = () => of(console.log('scheduler will log this'));

pollingFactory.create(fetchData);
pollingFactory.create(logSomething);
```

### Combine with POST/PUT

Update the status immediatly after modifying a resource.

```ts
const url = 'https://my-domain/api/v1/items';

const getItems = (http: HttpClient) => () => httpClient.get<Item[]>(url);

@Injectable()
export class MyService {
  public polling = this.pollingFactory.create(getItems(this.http));

  constructor(private pollingFactory: PollingFactoryService, private http: HttpClient) {}

  public createItem(item: Item): Observable<Item> {
    return concat(
      defer(() => this.http.post<void>(url, item)),
      defer(() => this.polling.update())
    );
  }
}
```

### Terminate polling

Unsubscribe from `status$` to cancel the polling.

> Note: You can trigger immediate updates with `handle.update()` even after termination.

```ts
const url = 'https://my-domain/api/v1/items';

const getItems = (http: HttpClient) => () => httpClient.get<Item[]>(url);

@Injectable()
export class MyService {
  public polling = this.pollingFactory.create(getItems(this.http));

  constructor(private pollingFactory: PollingFactoryService, private http: HttpClient) {}

  public startPolling(destroy$: Observable<void>): void {
    this.polling.status$.pipe(takeUntil(destroy$)).subscribe();
  }
}
```

With the `takeUntil()` convenience method you can ensure that callers must provide a termination criterion before the polling can start.

```ts
const url = 'https://my-domain/api/v1/items';

const getItems = (http: HttpClient) => () => httpClient.get<Item[]>(url);

@Injectable()
export class MyService {
  private _polling = this.pollingFactory.create(getItems(this.http));

  constructor(private pollingFactory: PollingFactoryService, private http: HttpClient) {}

  public getHandle(destroy$: Observable<void>): PollingHandle<Item> {
    return this._polling.takeUntil(destroy$);
  }
}
```

```ts
// in your component
this.myService.getHandle(this.destroy$).status$.subscribe();
```

---

> For a complete example check out the example-app in this repository.
