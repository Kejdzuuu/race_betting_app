export interface Race {
  id: number;
  name: string;
  active: boolean;
  participants: number[];
}

export interface Participant {
  id: number;
  body: string;
}
