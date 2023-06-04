export interface Note {
  id: string;
  userId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  notes: [Note];
}
