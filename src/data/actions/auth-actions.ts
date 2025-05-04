"use server";

export async function registerUserAction(prevState: any, formData: FormData) {
    console.log("Hello from registerUserAction!");
    
    const fields = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    };

    return {
        ...prevState,
        fields,
    }
}