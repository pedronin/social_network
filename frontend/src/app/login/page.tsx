import React from 'react'
import { Metadata } from 'next'
import Auth from '@/components/auth/Auth'

export const metadata: Metadata = {
	title: 'Login'
}

function LoginPage() {
    return <Auth type={"Login"} />
}

export default LoginPage
