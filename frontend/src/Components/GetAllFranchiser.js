import React, { useEffect } from 'react'
import {useQuery} from '@apollo/client'
import { ALL_FRANCISER } from '../GraphQL/Queries'

function GetAllFranchiser() {
	const {error, loading, data} = useQuery(ALL_FRANCISER)
	useEffect(() =>{
		console.log(data);
	},[data])
	return (
		<div>
			List
		</div>
	)
}

export default GetAllFranchiser