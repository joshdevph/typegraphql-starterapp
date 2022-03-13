import { gql } from "@apollo/client";

export const ALL_FRANCISER = gql `
    query{
        allFranchiseUserOrFranchiser(id: 1){
            name
            role
            id
        }
    }
`