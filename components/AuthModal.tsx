"use client"

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();

    return (
        <Modal
            title="Welcome back"
            description="Glad to see you again!"
            isOpen
            onChange={() => {}}
        >
            <Auth 
                supabaseClient={supabaseClient}
            />
        </Modal>
    );
}

export default AuthModal;