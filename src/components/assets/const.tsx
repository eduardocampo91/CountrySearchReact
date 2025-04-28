import { gql } from "@apollo/client";

//GQL Query
export const LIST_COUNTRIES = gql`
  query {
    countries {
      code
      name
      currency
      capital
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;

export const SEARCH_COUNTRY_BY_NAME = gql`
  query GetCountryByName($regex: String!) {
    countries(filter: { name: { regex: $regex } }) {
      code
      name
      capital
      currency
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;

//General const

export const ITEMS_PER_PAGE = 15;
