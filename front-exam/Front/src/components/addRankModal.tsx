import { Modal, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { Axios } from "../lib/api";

type IProps = {
  id: number
  studentId: number
  isOpen: boolean
  handleClose: () => void
};

type RankForm = {
  rank: number;
};

export const AddRankModal: React.FC<IProps> = ({ isOpen, handleClose, id, studentId }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RankForm>();


  const onSubmit = async (data: RankForm) => {   
    try {
      Axios
      .post("/classbook/lessons/" + id + "/rank", {student: studentId, rank: data.rank})
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
          Add Rank
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Rank
            </label>
            <input
              type="number"
              placeholder="Enter rank"
              {...register('rank', {
                required: 'Rank is required',
                min: { value: 1, message: 'Must be at least 1' },
                max: { value: 10, message: 'Must be less than 10' },
              })}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none 
                         focus:ring-2 focus:ring-blue-500"
            />
            {errors.rank && (
              <p className="text-sm text-red-500">{errors.rank.message}</p>
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

