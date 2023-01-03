import log from 'loglevel';
import { getContext, onDestroy, onMount, setContext } from 'svelte';
import { get, writable, type Unsubscriber, type Writable } from 'svelte/store';

export type OnTickCallback = (sinceLastTickMs: number) => void;
export interface TimerContext {
  onTick: (cb: OnTickCallback) => Unsubscriber;
  start: () => void;
  stop: () => void;
  isRunning: Writable<boolean>;
}
export function createTimerContext(contextName = 'timer') {
  let tickCbs: OnTickCallback[] = [];
  let intervalHandle: NodeJS.Timer | undefined;
  let isRunning = writable<boolean>(false);
  isRunning.subscribe((newIsRunning) => {
    if (newIsRunning && !intervalHandle) {
      let lastTickAt = performance.now();
      intervalHandle = setInterval(() => {
        const now = performance.now();
        const sinceLastTickMs = now - lastTickAt;
        tickCbs.forEach((cb) => cb(sinceLastTickMs));
        lastTickAt = performance.now();
      }, 1000 / 100);
    } else if (!newIsRunning && intervalHandle) {
      clearInterval(intervalHandle);
      intervalHandle = undefined;
    }
  });
  const timer: TimerContext = {
    onTick: (cb) => {
      tickCbs.push(cb);
      return () => {
        tickCbs = tickCbs.filter((tickCb) => tickCb !== cb);
      };
    },
    start: () => {
      isRunning.set(true);
    },
    stop: () => {
      isRunning.set(false);
    },
    isRunning
  };
  setContext(contextName, timer);

  onDestroy(() => {
    timer.stop();
    tickCbs = [];
  });
}

export function isTimerContext(test: unknown): test is TimerContext {
  return !!test && typeof test === 'object' && typeof (test as TimerContext).onTick === 'function';
}

export function getTimerContext(contextName = 'timer'): TimerContext {
  const result = getContext(contextName);
  if (!result || !isTimerContext(result)) {
    log.error(contextName + ' is not a TimerContext', result);
    throw new Error(contextName + ' is not a TimerContext');
  }
  return result;
}

export function tryGetTimerContext(contextName = 'timer'): TimerContext | undefined {
  const result = getContext(contextName);
  if (!result || !isTimerContext(result)) {
    return undefined;
  }
  return result;
}

export function createTickListener(cb: OnTickCallback, contextName = 'timer'): void {
  const timer = getTimerContext(contextName);
  onMount(() => {
    return timer.onTick(cb);
  });
}
