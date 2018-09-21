import { IOptions, JSCPD } from '..';
import { END_PROCESS_EVENT, INITIALIZE_EVENT } from '../events';
import { IListener } from '../interfaces/listener.interface';
import { StoresManager } from '../stores/stores-manager';

export class StateListener implements IListener {
  constructor(private options: IOptions) {}

  public attach(): void {
    JSCPD.getEventsEmitter().on(INITIALIZE_EVENT, this.initialize.bind(this));
    JSCPD.getEventsEmitter().on(END_PROCESS_EVENT, this.endProcess.bind(this));
  }

  private initialize() {
    StoresManager.initialize(this.options.storeOptions);
    StoresManager.flush();
  }

  private endProcess() {
    StoresManager.close();
  }
}