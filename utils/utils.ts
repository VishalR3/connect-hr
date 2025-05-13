import { toast } from "sonner";

export const formatIndianCurrency = (number: number) => {
  const formattedNumber = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);

  return formattedNumber;
};

export async function handleAsyncWithToast<T>(
  operation: () => Promise<T>, // Function to execute
  successMessage = "Success",
  errorMessage = "An unexpected error occurred. Please try again." // Default error message
): Promise<void> {
  try {
    const response = new Promise(async (resolve, reject) => {
      const result = (await operation()) as any;
      if (result?.error) reject(new Error(result.error));
      resolve(result?.data);
    });

    toast.promise(response, {
      loading: "Loading...",
      success: () => {
        return successMessage;
      },
    });
  } catch (error) {
    console.error("Error during operation:", error);

    // Show error message
    toast.error(errorMessage);
  }
}
