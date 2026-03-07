import { useRouter } from "next/router";
import PrintablePaymentCard from "~/components/paymentPrintableCard";
import PrintableStudentCard from "~/components/studentPrintableCard";
import { api } from "~/utils/api";

const Demo: React.FunctionComponent = () => {
  const {
      data: paymentData,
      isError: isPaymentDataError,
      isLoading: isPaymentDataLoading,
    } = api.payment.getAllMonthlyPayments.useQuery({
      startingMonth: '',
    });
  return (
    paymentData? <PrintablePaymentCard
          amount={paymentData[0]?.amountPaid.toString() ?? ""}
          centre={paymentData[0]?.centre.name.toString() ?? ""}
          months={paymentData[0]?.paymentMonths ?? []}
          name={paymentData[0]?.student.name ?? ""}
          parentName={paymentData[0]?.student.parentName ?? ""}
          paymentFor={paymentData[0]?.paymentFor ?? ""}
          status={paymentData[0]?.status ?? ""}
          studentId={paymentData[0]?.student.studentId ?? ""}
          subject={paymentData[0]?.course.name ?? ""}
          date={paymentData[0]?.dateTime.toISOString().split("T")[0] ?? ""}
          address={paymentData[0]?.student.address ?? ""}
          contactNumber1={paymentData[0]?.student.parentContactNumber1 ?? ""}
          contactNumber2={paymentData[0]?.student.parentContactNumber2 ?? ""}

    />: <div>Loading...</div>
  );
};

export default Demo;