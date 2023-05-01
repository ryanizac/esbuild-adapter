export type StageObserver = {
  emit(name: StageObserver.RequiredStages): void;
};

export namespace StageObserver {
  export type RequiredStages = "build" | "rebuild";
}
