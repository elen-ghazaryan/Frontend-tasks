import { Modal, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { Axios } from "../lib/api";

type IProps = {
  isOpen: boolean
  handleClose: () => void
};

type LessonForm = {
  title: string;
};

export const AddLessonModal: React.FC<IProps> = ({ isOpen, handleClose }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LessonForm>();


  const onSubmit = async (data: LessonForm) => {    
    try {
      Axios
      .post("/classbook/lessons", {title: data.title})
      .then(res => {
        console.log(res.data)
        reset();
        handleClose();
      
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        className="absolute top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 
                   bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Add Lesson
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Lesson Title
            </label>
            <input
              type="text"
              placeholder="Enter lesson title"
              {...register("title", { required: "Title is required" })}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none 
                         focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};
