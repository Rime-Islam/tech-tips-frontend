import { motion } from "framer-motion";

interface CategoryCardProps {
    handleCategory: (category: string) => void;
  }
const Category:React.FC<CategoryCardProps> = ({ handleCategory }) => {
    const categories: string[] = [
        "Software Engineer",
        "Web Development",
        "Cybersecurity",
        "DevOps",
        "Machine Learning",
        "Blockchain",
        "UI/UX Design",
      ];

    return (
        <div>
  <div className=''>
      {
        categories?.length && categories?.map((item: string) => (
          <div key={item} className='mx-2'>
          <motion.div
  onClick={() => handleCategory(item)} className="px-2 mt-2 py-1 lg:text-sm  bg-gray-300 dark:bg-gray-900 rounded-lg select-none ">
            {item}
          </motion.div>
        </div>
        ))
      }
        </div>
        </div>
    )
};

export default Category;