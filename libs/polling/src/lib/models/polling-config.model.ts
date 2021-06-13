export interface PollingConfig {
  /** Delay for the first poll in ms. */
  initialDelay: number;
  /** Delay from one poll to the next. */
  pollingRate: number;
}
