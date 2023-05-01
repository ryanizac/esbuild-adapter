import { MappedStages, stages } from "../shared";

export class StageObserver {
  private subjects: StageObserver.Subject[];

  constructor() {
    this.subjects = [];
  }

  on(name: MappedStages, callback: StageObserver.Callback) {
    this.subjects.push({
      name,
      callback,
    });
  }

  emit(name: MappedStages) {
    const subjects = this.subjects;

    subjects.forEach((subject) => {
      if (subject.name !== name) {
        return;
      }

      subject.callback();
    });
  }
}

export namespace StageObserver {
  export type Callback = () => void;

  export type Subject = {
    name: MappedStages;
    callback: Callback;
  };
}
