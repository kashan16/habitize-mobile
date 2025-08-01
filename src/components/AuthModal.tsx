import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthMode } from "../hooks/useAuthForm";
import { useAuth } from "../context/AuthContext";
import { useAuthStore } from "../stores/authStore";

interface PasswordInputProps {
    label : string;
    value : string;
    onChange : (text : string) => void;
    showPassword : boolean;
    toggleVisibility : () => void;
    placeholder ?: string;
}

// Reusable Password Input
const PasswordInput : React.FC<PasswordInputProps> = ({
  label,
  value,
  onChange,
  showPassword,
  toggleVisibility,
  placeholder = "********",
}) => (
  <View className="space-y-2">
    {label && <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</Text>}
    <View className="relative">
      <TextInput
        value={value}
        onChangeText={onChange}
        secureTextEntry={!showPassword}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
        className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg pr-10 text-gray-900 dark:text-white"
      />
      <TouchableOpacity onPress={toggleVisibility} className="absolute right-3 top-3">
        <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  </View>
);

interface AuthModalProps {
  visible : boolean;
  onClose : () => void;
  defaultMode ?: AuthMode;
}

type FormFieldName = 'email' | 'password' | 'username' | 'confirmPassword';

interface FormValue {
  email : string;
  password : string;
  username : string;
  confirmPassword : string;
}
interface ModalContent {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  submitButton: string;
  submittingButton: string;
  toggleText: string;
  toggleLink: string;
}

export function AuthModal({ visible, onClose, defaultMode = "login" }: AuthModalProps) {
  const { user, loading: userLoading } = useAuth();
  const [currMode, setCurrMode] = useState<AuthMode>(defaultMode);
  const [emailSent, setEmailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });

  const {
    signUp,
    signIn,
    signInWithGoogle,
    sendPasswordResetEmail,
    error: authError,
    loading: authLoading,
    clearError,
  } = useAuthStore();

  useEffect(() => {
    if (visible) {
      setCurrMode(defaultMode);
      clearError();
      setEmailSent(false);
      setShowPassword(false);
      setFormValues({ email: "", password: "", username: "", confirmPassword: "" });
    }
  }, [visible, defaultMode]);

  useEffect(() => {
    if (user && !userLoading) onClose();
  }, [user, userLoading]);

  const handleInputChange = (field: keyof FormValue) => (text: string) =>
    setFormValues((prev) => ({ ...prev, [field]: text }));

  const isFormValid = () => {
    const { email, password, username, confirmPassword } = formValues;
    if (currMode === "login") return !!email && !!password;
    if (currMode === "signup") return !!email && !!password && !!username && password === confirmPassword;
    if (currMode === "forgotPassword") return !!email;
    return false;
  };

  const handleFormSubmit = async () => {
    if (!isFormValid() || authLoading) return;
    try {
      if (currMode === "signup") {
        await signUp(formValues.email, formValues.password, formValues.username);
      } else if (currMode === "login") {
        await signIn(formValues.email, formValues.password);
      } else if (currMode === "forgotPassword") {
        await sendPasswordResetEmail(formValues.email);
        setEmailSent(true);
        return;
      }
      if (!useAuthStore.getState().error) onClose();
    } catch (err) {
      console.error("Auth Error:", err);
    }
  };

  const handleGoogleSignIn = async () => {
    if (authLoading) return;
    await signInWithGoogle();
  };

  const modalContent: Record<AuthMode, ModalContent> = {
    login: {
      icon: "lock-closed",
      title: "Welcome back",
      subtitle: "Sign in to continue to your account",
      submitButton: "Sign In",
      submittingButton: "Signing In...",
      toggleText: "Don't have an account?",
      toggleLink: "Sign Up",
    },
    signup: {
      icon: "person",
      title: "Create your account",
      subtitle: "Join us and start your journey",
      submitButton: "Create Account",
      submittingButton: "Creating Account...",
      toggleText: "Already have an account?",
      toggleLink: "Sign In",
    },
    forgotPassword: {
      icon: "mail",
      title: "Reset Password",
      subtitle: "Enter your email to receive a reset link.",
      submitButton: "Send Reset Link",
      submittingButton: "Sending...",
      toggleText: "Remembered password?",
      toggleLink: "Sign In",
    },
  };

  const currentContent = modalContent[currMode];

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        className="bg-black/70"
      >
        <SafeAreaView className="flex-1 justify-center items-center px-4">
          <View 
            className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-700"
            style={{ maxHeight: "90%" }}
          >
            {/* Close Button */}
            <TouchableOpacity 
              onPress={onClose} 
              className="absolute top-4 right-4 p-2"
            >
              <Ionicons name="close" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <View className="items-center my-4">
                <Ionicons 
                  name={currentContent.icon} 
                  size={40} 
                  color="#3B82F6" 
                />
                <Text className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {currentContent.title}
                </Text>
                <Text className="text-gray-600 dark:text-gray-400 text-center">
                  {currentContent.subtitle}
                </Text>
              </View>

              {authError && (
                <View className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Text className="text-sm text-red-700 dark:text-red-400">
                    {authError}
                  </Text>
                </View>
              )}

              {currMode === "forgotPassword" && emailSent ? (
                <View className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg my-4">
                  <Text className="text-green-700 dark:text-green-400 text-center">
                    Password reset link sent to{" "}
                    <Text className="font-bold">{formValues.email}</Text>
                  </Text>
                </View>
              ) : (
                <>
                  {currMode === "signup" && (
                    <TextInput
                      placeholder="Username"
                      placeholderTextColor="#9CA3AF"
                      value={formValues.username}
                      onChangeText={handleInputChange("username")}
                      className="mb-4 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
                    />
                  )}
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="#9CA3AF"
                    value={formValues.email}
                    onChangeText={handleInputChange("email")}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="mb-4 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
                  />
                  {currMode !== "forgotPassword" && (
                    <>
                      <PasswordInput
                        label="Password"
                        value={formValues.password}
                        onChange={handleInputChange("password")}
                        showPassword={showPassword}
                        toggleVisibility={() => setShowPassword((s) => !s)}
                        placeholder="Enter your password"
                      />
                      {currMode === "signup" && (
                        <PasswordInput
                          label="Confirm Password"
                          value={formValues.confirmPassword}
                          onChange={handleInputChange("confirmPassword")}
                          showPassword={showPassword}
                          toggleVisibility={() => setShowPassword((s) => !s)}
                          placeholder="Confirm your password"
                        />
                      )}
                    </>
                  )}
                </>
              )}

              <TouchableOpacity
                onPress={handleFormSubmit}
                disabled={!isFormValid() || authLoading}
                className={`w-full mt-4 py-3 px-4 bg-blue-600 rounded-lg ${
                  (!isFormValid() || authLoading) ? "opacity-50" : ""
                }`}
              >
                {authLoading ? (
                  <View className="flex-row justify-center items-center">
                    <ActivityIndicator size="small" color="white" />
                    <Text className="text-white font-semibold ml-2">
                      {currentContent.submittingButton}
                    </Text>
                  </View>
                ) : (
                  <Text className="text-white font-semibold text-center">
                    {currentContent.submitButton}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Google Sign-In Button - Added back */}
              {currMode !== "forgotPassword" && !emailSent && (
                <>
                  <View className="relative my-4">
                    <View className="absolute inset-0 flex items-center">
                      <View className="w-full border-t border-gray-300 dark:border-gray-600" />
                    </View>
                    <View className="relative flex justify-center">
                      <Text className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm mx-auto">
                        Or continue with
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={handleGoogleSignIn}
                    disabled={authLoading}
                    className="w-full py-3 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg flex-row justify-center items-center"
                  >
                    <Ionicons name="logo-google" size={20} color="#DB4437" />
                    <Text className="text-gray-700 dark:text-gray-200 font-semibold ml-2">
                      Sign in with Google
                    </Text>
                  </TouchableOpacity>
                </>
              )}

              {/* Toggle Mode */}
              <Text className="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
                {currentContent.toggleText}{" "}
                <Text
                  onPress={() => {
                    setCurrMode(currMode === "login" ? "signup" : "login");
                    clearError();
                  }}
                  className="text-blue-600 dark:text-blue-400 font-semibold"
                >
                  {currentContent.toggleLink}
                </Text>
              </Text>
            </ScrollView>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

/* const styles = StyleSheet.create({
  container: {
    maxHeight: "90%",
  }
}); */
