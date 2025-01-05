import { useContext, useEffect } from "react";
import Loader from "../../Loader";
import myContext from "../../../context/myContext";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../../FirebaseConfig";
import { toast } from "react-toastify";

const UserRequestCallInfo = () => {
  const { loading, setLoading, userCallInfo, getAllUserCallInfo } =
    useContext(myContext);

  useEffect(() => {
    getAllUserCallInfo();
  }, [getAllUserCallInfo]);

  const deleteUserRequest = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user request?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(fireDB, "userRequests", id));
      toast.success("User info deleted successfully");

      // Check if the phone number is new
      const isNewNumber = !userCallInfo.some(
        (request) => request.phoneNumber === newPhoneNumber
      );
      if (isNewNumber) {
        // Send WhatsApp message
        await sendWhatsAppMessage(newPhoneNumber);
        // Notify via email or SMS
        await notifyNewNumber(newPhoneNumber);
      }
    } catch (error) {
      console.error("Error deleting user request:", error);
      toast.error("Failed to delete user info");
    }
  };

  // Function to send WhatsApp message
  const sendWhatsAppMessage = async (phoneNumber) => {
    // Use WhatsApp API or service like Twilio
    // Example: await twilioClient.messages.create({ ... });
  };

  // Function to notify via email or SMS
  const notifyNewNumber = async (phoneNumber) => {
    // Use email service like SendGrid or SMS service like Twilio
    // Example: await sendEmailNotification(phoneNumber);
  };

  return (
    <div>
      <div className="py-5 flex justify-between items-center">
        <h1 className="text-xl text-pink-300 font-bold">User Requests</h1>
      </div>

      {/* <div className="flex justify-center relative top-20">
                {loading && <Loader />}
            </div> */}

      <div className="w-full overflow-x-auto mb-5">
        <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
          <tbody>
            <tr>
              <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                S.No.
              </th>
              <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                Phone Number
              </th>
              <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                Product Title
              </th>
              <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                Time
              </th>
              <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                Call
              </th>
              <th className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                Call Status
              </th>
            </tr>
            {userCallInfo.map((request, index) => (
              <tr key={request.id} className="text-pink-300">
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                  {index + 1}.
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                  +91{request.phoneNumber}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                  {request.productTitle}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                  {new Date(request.time).toLocaleString()}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                  <a
                    href={`tel:${request.phoneNumber}`}
                    className="bg-pink-500 text-white px-4 py-2 rounded-md"
                  >
                    Call
                  </a>
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                  <select className="bg-white border border-pink-100 text-slate-500 rounded-md">
                    <option value="accept">Accept Call</option>
                    <option value="reject">Reject Call</option>
                    <option value="later">Call Me Later</option>
                  </select>
                </td>
                <td
                  onClick={() => deleteUserRequest(request.id)}
                  className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer"
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRequestCallInfo;
