import { gql } from '@apollo/client';

export const REMOVE_NOTE = gql`
  mutation ($removeNoteInput: RemoveNoteInput!) {
    removeNote(removeNoteInput: $removeNoteInput)
  }
`;

export const CREATE_USER = gql`
  mutation ($registerInput: CreateUserInput!) {
    createUser(createUserInput: $registerInput) {
      id
    }
  }
`;

export const CREATE_NOTE = gql`
  mutation createNote($createNoteInput: CreateNoteInput!) {
    createNote(createNoteInput: $createNoteInput) {
      id
      description
      userId
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation updateNote($updateNoteInput: UpdateNoteInput!) {
    updateNote(updateNoteInput: $updateNoteInput) {
      id
      description
      userId
      createdAt
      updatedAt
    }
  }
`;
