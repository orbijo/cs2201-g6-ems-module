import Dexie, { Table } from 'dexie';
import { populate } from './populate';

export interface User {
  id?: number;
  id_num: number;
  first_name: string;
  last_name: string;
  email: string;
  role: 'PARTICIPANT' | 'ORGANIZER' | 'APPROVER',
  password: string;
  updated_at: string;
  deleted_at: string;
}

export interface Organizer {
  id?: number;
  user_id_fk: number;
  updated_at: string;
  deleted_at: string;
}

export interface Participant {
  id?: number;
  user_id_fk: number;
  ces_pts: number;
  updated_at: string;
  deleted_at: string;
}

export interface Event {
  id?: number;
  organizer_id_fk: number;
  approver_id_fk: number | null;
  event_name: string;
  description: string;
  updated_at: string;
  deleted_at: string;
}

export interface EventParticipant {
  id?: number;
  event_id_fk: number;
  participant_id_fk: number;
  attended_at: string;
  updated_at: string;
  deleted_at: string;
}

export class MySubClassedDexie extends Dexie {
  user!: Table<User>; 
  participant!: Table<Participant>;
  event!: Table<Event>;
  eventParticipant!: Table<EventParticipant>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      event: '++id, status',
      participant: '++id, student_id, status',
      user: '++id',
      eventParticipant: '++id'
    });
  }
}

export const db = new MySubClassedDexie(); 

db.on('populate', populate);