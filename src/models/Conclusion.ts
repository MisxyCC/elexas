export interface ConclusionInformation {
  readonly fullName?: string;
  readonly age?: number;
  exerciseConclusion: ExerciseConclusion;
}
export interface ExerciseConclusion {
  readonly currentDateTime?: Date;
  readonly totalUsedTime?: string;
  readonly averageHBP?: number;
}
