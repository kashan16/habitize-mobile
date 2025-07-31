import { createClient, Session, User } from '@supabase/supabase-js';
import Config from 'react-native-config';
import { create } from 'zustand';
import * as Linking from 'expo-linking';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';


const supabase = createClient(
    Config.EXPO_PUBLIC_SUPABASE_URL!,
    Config.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

interface AuthState {
    user : User | null;
    session : Session | null;
    loading : boolean;
    error : string | null;

    signUp : (email : string , password : string , username : string) => Promise<void>;
    signIn : (email : string , password : string) => Promise<void>;
    signOut : () => Promise<void>;
    clearError : () => void;
    signInWithGoogle : () => Promise<void>;
    sendPasswordResetEmail : ( email : string ) => Promise<void>;
    updatePassword : ( newPassword : string ) => Promise<void>; 
    initialize : () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set , get) => {
    const navigation = useNavigation();
    return ({
        user : null,
        session : null,
        loading : false,
        error : null,  
        
        signUp : async (email : string , password : string , username : string) => {
            set({ loading : true , error : null });
            const { data , error } = await supabase.auth.signUp({
                email,
                password,
                options : {
                    data : {
                        username
                    }
                }
            });
            if(error) {
                set({ error : error.message , loading : false });
                return;
            }
            set({ user : data.user , session : data.session , loading : false });
            Toast.show({ type : 'success' , text1 : `Check ${email} for verification.` });
            /* navigation.navigate('VerifyEmail'); */
        },
        signInWithGoogle : async () => {
            set({ loading : true , error : null });
            try {
                const { data , error } = await supabase.auth.signInWithOAuth({
                    provider : 'google',
                    options : {
                        redirectTo : Linking.createURL('auth-callback'),
                    },
                });
                if(error) {
                    throw error;
                }
            } catch {
                set({ error : 'Google sign-in failed' , loading : false });
            }
        },
        signIn : async (email : string , password : string) => {
            set({ loading : true , error : null });
            try {
                const { data , error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });
                if(error) {
                    set({ error : error.message , loading : false });
                    return;
                }
                set({
                    user : data.user,
                    session : data.session,
                    loading : false,
                    error : null
                });
            } catch(err) {
                set({
                    error : err instanceof Error ? err.message : "An error occurred",
                    loading : false
                });
            }
        },
        signOut : async () => {
            set({ loading : false });
            try {
                const { error } = await supabase.auth.signOut();
                if(error) {
                    set({ error : error.message , loading : false});
                    if(error) {
                        set({ error : error.message , loading : false });
                        return;
                    }
                    set({
                        user : null,
                        session : null,
                        loading : false,
                        error : null
                    });
                }
            } catch(err) {
                set({
                    error : err instanceof Error ? err.message : "An error Occurred",
                    loading : false
                });
            }
        },
        clearError : () => set({ error : null }),
        sendPasswordResetEmail : async (email : string) => {
            set({ loading : true , error : null });
            try {
                const { error } = await supabase.auth.resetPasswordForEmail(email , {
                    redirectTo : Linking.createURL('reset-password')
                });
                if(error) {
                    throw error;
                }
                Toast.show({ type : "success" , text1 : `A password reset link has been sent on ${email}`});
                set({ loading : false })
            } catch (err) {
                const error = err as Error;
                console.error('Password reset error : ',error);
                Toast.show({ type : "error" , text1 : 'An error occured. Please try again later' });
                set({ error : error.message , loading : false });
            }
        },
        updatePassword : async (newPassword : string) => {
            set({ loading : false , error : null });
            try {
                const { data , error } = await supabase.auth.updateUser({
                    password : newPassword,
                });
                if(error) {
                    throw error;
                }
                set({ loading : false , user : data.user });
                Toast.show({ type : 'success' , text1 : "Your password has been updated successfully! You can sign in." });
            } catch( err ) {
                const error = err as Error;
                console.error('Password update error : ', error);
                Toast.show({ type : "error" , text1 : 'Failed to update password' });
                set({ error : error.message , loading : false }); 
            }
        },
        initialize : async () => {
            set({ loading : true });
            try {
                const { data : { session } , error } = await supabase.auth.getSession();
                if(error) {
                    Toast.show({ type : 'error' , text1 : `Error getting session : ${error}` });
                    set({ loading : false , error : error.message });
                    return;
                }
                set({
                    user : session?.user || null,
                    session : session || null,
                    loading : false,
                })
            } catch(err) {
                Toast.show({ type : 'error' , text1 : `Error initializing AUTH ${err}` });
                set({
                    loading : false,
                    error : err instanceof Error ? err.message : "Failed to initialize AUTH"
                });
            }
        }
    })
});