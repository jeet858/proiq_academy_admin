import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MarkAttendanceTable from "~/components/markAttendanceTable";
import ErrorScreen from "~/components/errorScreen";
import LoadingScreen from "~/components/loadingScreen";
import { MainPageTemplate } from "~/templates";
import { api } from "~/utils/api";
import ReaddmissionTable from "~/components/readdmissionTable";
import { HiMiniArrowLongDown } from "react-icons/hi2";
interface ReaddmissionForm {
  centreId: string;
  courseId: string;
  readmissionCourseId: string;

  readmissionPaymentAmount: string;
}
const Readdmission: React.FunctionComponent = () => {
  const [errorString, setErrorString] = useState("");
  const [formData, setFormData] = useState<ReaddmissionForm>({
    centreId: "",
    courseId: "",
    readmissionCourseId: "",
  } as ReaddmissionForm);

  const { status, data: session } = useSession();
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  const {
    data: centres,
    isError,
    isLoading,
  } = api.centre.getAllCentreByUserId.useQuery({
    id: session?.user.id ?? "",
    role: session?.user.role ?? "",
  });
  const {
    data: courses,
    isError: isCoursesError,
    isLoading: isCoursesLoading,
  } = api.course.getCourseByCentreId.useQuery({
    centreId: formData.centreId,
  });
  const router = useRouter();
  const { centreId, courseId, date } = router.query;

  const {
    data: students,
    isError: isStudentError,
    isLoading: isStudentLoading,
  } = api.student.getByCentreAndCourseId.useQuery({
    centreId: formData.centreId,
    courseId: formData.courseId,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Set session loaded flag after session data is available
  useEffect(() => {
    if (status !== "loading") {
      setIsSessionLoaded(true);
    }
  }, [status]);

  if (
    status === "loading" ||
    !isSessionLoaded ||
    isLoading ||
    isCoursesLoading
  ) {
    return <LoadingScreen />;
  }

  if (status === "unauthenticated") {
    return (
      <ErrorScreen errorString="You don't have permission to access this screen" />
    );
  }

  if (errorString !== "" || isError || isCoursesError) {
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
      <div className="container mx-auto flex w-4/5 flex-col items-center p-6">
        <h1 className=" text-3xl ">
          Student <span className="text-[#DCA200]"> Readmission</span>
        </h1>
        <select
          className={`h-12 w-full justify-self-center border-b border-b-[#919191] focus:outline-none ${
            formData.centreId === "" ? "text-gray-400" : "text-black"
          }`}
          value={formData.centreId}
          name="centreId"
          onChange={handleChange}
        >
          <option selected disabled value="">
            Select Centre
          </option>
          {centres?.map((centre) => (
            <option value={centre.id} className="text-black" key={centre.id}>
              {centre.name}
            </option>
          ))}
        </select>
        <select
          className={`h-12 w-full justify-self-center border-b border-b-[#919191] focus:outline-none ${
            formData.courseId === "" ? "text-gray-400" : "text-black"
          }`}
          value={formData.courseId}
          name="courseId"
          onChange={handleChange}
        >
          <option selected disabled value="">
            Select Current Course
          </option>
          {courses?.map((course) => (
            <option value={course.id} className="text-black" key={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        <div className="my-4 justify-self-center text-gray-400">
          <HiMiniArrowLongDown className="h-8 w-8" />
        </div>
        <select
          className={`h-12 w-full justify-self-center border-b border-b-[#919191] focus:outline-none ${
            formData.readmissionCourseId === "" ? "text-gray-400" : "text-black"
          }`}
          value={formData.readmissionCourseId}
          name="readmissionCourseId"
          onChange={handleChange}
        >
          <option selected disabled value="">
            Select Readmission Course
          </option>
          {courses?.map((course) => (
            <option value={course.id} className="text-black" key={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        <input
          placeholder="Enter Default Readmission Payment Amount"
          type="number"
          name="readmissionPaymentAmount"
          onChange={handleChange}
          className="h-12 w-full min-w-full justify-self-center border-b border-b-[#919191] pl-1 focus:outline-none lg:justify-self-end"
        />
        {students ? (
          <ReaddmissionTable
            students={students}
            payment={Number(formData.readmissionPaymentAmount)}
            previousCourseId={formData.courseId}
            newCourseId={formData.readmissionCourseId}
            centreId={formData.centreId}
          />
        ) : null}
      </div>
    </MainPageTemplate>
  );
};
export default Readdmission;
