export class ThresholdData {
  id!: string;
  userId!: string;

  parameter!: string;

  value?: number | null;
  minValue?: number | null;
  maxValue?: number | null;

  unit!: string;
}
