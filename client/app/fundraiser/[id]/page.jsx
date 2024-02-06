'use client'
import FundDetailsPage from '../../components/Fundraisers/FundDetailsPage';
import React from "react";

const Page = ({params}) => {
    return (
        <div>
            <FundDetailsPage id={params.id} />
        </div>
    )
}

export default Page;
 