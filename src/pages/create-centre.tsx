import { Modal } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { ChangeEventHandler, useState } from "react";
import CustomDropdown from "~/components/customDropdown";
import ErrorScreen from "~/components/errorScreen";
import LoadingScreen from "~/components/loadingScreen";
import SuccessPopup from "~/components/successPopup";
import { MainPageTemplate } from "~/templates";
import { api } from "~/utils/api";
interface CentreForm {
  name: string;
  location: string;
}
const CreateCentre: React.FunctionComponent = () => {
  const [formData, setFormData] = useState<CentreForm>({} as CentreForm);
  const [errorString, setErrorString] = useState("");
  const [isScuccess, setIsSuccess] = useState(false);
  const { status, data: session } = useSession();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    createCentre.mutate(formData);
  };

  const createCentre = api.centre.create.useMutation({
    onError(error, variables, context) {
      setErrorString(error.message);
    },
    onSuccess(data, variables, context) {
      setIsSuccess(true);
    },
  });

  if (status == "unauthenticated" || session?.user.role != "admin") {
    return (
      <ErrorScreen errorString="You dont have permission to access this screen" />
    );
  }
  if (status == "loading") {
    return <LoadingScreen />;
  }
  if (errorString != "") {
    return (
      <ErrorScreen
        errorString={errorString}
        onClick={() => {
          setErrorString("");
        }}
      />
    );
  }
  return (
    <MainPageTemplate>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col justify-start gap-y-7"
      >
        <div className="flex gap-x-4 self-center px-[10%] pt-7">
          <h1 className="self-center py-7 text-3xl">
            Centre <span className="text-[#DCA200]"> Registration</span>
          </h1>
        </div>

        <div className="grid w-full max-w-[90%] grid-cols-1 self-center sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:gap-x-[10%]">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="h-12 w-full min-w-full justify-self-center border-b border-b-[#919191] pl-1 focus:outline-none lg:col-span-2 lg:justify-self-end"
          />

          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Full Address"
            className="col-span-1 h-12 w-full justify-self-center border-b border-b-[#919191] pl-1 focus:outline-none lg:col-span-2 lg:justify-self-end"
          />
        </div>

        <div className="flex gap-x-6 self-center justify-self-center pb-7">
          <button
            type="button"
            onClick={() => setFormData({} as CentreForm)}
            className="rounded bg-[#202B5D] px-8 py-3 text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-[#DCA200] px-8 py-3 text-white"
          >
            Save
          </button>
        </div>
      </form>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={isScuccess}
        onClose={() => {
          setIsSuccess(false);
        }}
        className="flex h-full w-full items-center justify-center"
      >
        <SuccessPopup
          onClick={() => {
            setIsSuccess(false);
          }}
          message="Centre created succesfully"
        />
      </Modal>
    </MainPageTemplate>
  );
};
export default CreateCentre;
