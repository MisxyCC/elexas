export interface VideoDetail {
  id: number;
  title: string;
  imageUrl: string;
  timeUsed: string;
  exerciseProgramDetail: ExerciseProgramDetail[];
}
export enum ExerciseProgramName {
  Warmup = 'ท่าอบอุ่นร่างกาย',
  BalanceTraining = 'ท่าฝึกการทรงตัว',
  LegStrengthening = 'ท่าเพิ่มความแข็งแรงของกล้ามเนื้อขา',
  Cooldown = 'ท่าผ่อนคลายร่างกาย',
}
export interface ExerciseProgramDetail {
  name: ExerciseProgramName;
  totalSubPrograms: number;
  estimateTotalSubProgramsTime: number;
}
