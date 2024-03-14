"use client";

import Box from "@/components/Box";
import Button from "@/components/Button";
import { useUser } from "@/hooks/useUser";
import { Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiUser } from "react-icons/hi";

const AccountContent = () => {
    const router = useRouter();
    const { isLoading, user } = useUser();
    const [userStatus, setUserStatus] = useState('On Air');

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    const extractUsername = (email: string | undefined) => {
        if (email) {
            const atIndex = email.indexOf('@');
            if (atIndex !== -1) {
                return email.slice(0, atIndex);
            }
        }
        return 'Stunner';
    };

    return (
    <Box className="flex flex-col items-center justify-center pt-16">
        <div className="text-neutral-400 flex flex-col items-center">
            <Tooltip
            title={
                <React.Fragment>
                    <span
                    style={{
                        fontFamily: 'Montserrat',
                        fontWeight: '600',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                    >
                    <Typography 
                        fontFamily= 'inherit'
                        fontWeight= '600'
                        fontSize= 'inherit'
                    >
                    </Typography>
                        @{extractUsername(user?.email)}
                    </span>
                </React.Fragment>
            }
            arrow={true}
            placement="top"
        >
            <Button
                onClick={() => router.push('/account')}
                className='
                bg-white
                p-4
                mb-6
                rounded-full
                hover:opacity-75
                transition
                duration-300 ease-in-out
                '
                style={{
                    borderRadius: '50%',
                    width: '160px',
                    height: '160px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'calc(160px / 3)',
                }}
            >
                {user?.email ? user.email.substring(0, 3).toUpperCase() : 'STU'}
            </Button>
            </Tooltip>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                    Howdy &#x1F920;,
                </span>
                <span style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                    <strong>{extractUsername(user?.email).toUpperCase()}!</strong>
                </span>
                <br />
                <span style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                    Activity status: <span style={{ color: '#25B361' }}>{userStatus === 'On Air' ? 'On Air' : 'Off-Air'}</span>
                    <br />
                    You’re signed in as {user?.email || 'Stunner@domain.example'}.
                    <br />
                    <span style={{ fontSize: '1rem', marginTop: '0.5rem', fontStyle: 'italic' }}>
                        {userStatus === 'On Air' ? '‘Tuned In’' : '‘Out of Touch’'}
                    </span>
                </span>
            </div>
        </div>
    </Box>
    );
}

export default AccountContent;