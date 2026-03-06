'use client'
import { customFetch } from "@/utils/customFetch";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

import { useState } from "react";

const SamplePage = () => {

    const [apiData, setData] = useState('');
    const router = useRouter();
    const requestApi = async () => {
        const data = await customFetch('/api-be/adm/menu', {
            method: 'GET'
        })
        setData(data);
    }
    const routeToSignup = () => {
        router.push('/signup')
    }

    return <>
    <h1>하이</h1>
    <Button onClick={requestApi}>api요청</Button>
    <Button onClick={routeToSignup}>로그인페이지</Button>
    <hr/>
    <div>
        {JSON.stringify(apiData)}
    </div>
    </>
}

export default SamplePage;