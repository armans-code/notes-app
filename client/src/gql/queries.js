import { gql } from '@apollo/client';

export const GET_NOTE = gql`
  query getNote($findNoteInput: FindNoteInput!) {
    note(findNoteInput: $findNoteInput) {
      id
      userId
      description
      createdAt
      updatedAt
    }
  }
`;

export const GET_USERS = gql`
  query users {
    users {
      id
      email
      firstName
      lastName
    }
  }
`;

export const GET_USER_NOTES = gql`
  query user($id: String!) {
    user(id: $id) {
      notes {
        id
        description
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_PROFILE = gql`
  query user($id: String!) {
    user(id: $id) {
      id
      firstName
      lastName
      email
    }
  }
`;
