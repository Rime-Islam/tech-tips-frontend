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
        <div className="mb-8">
            <h1 className="lg:text-lg font-semibold px-4">Filter</h1>
  <div className=''>
      {
        categories?.length && categories?.map((item: string) => (
          <div key={item} className='mx-2  '>
          <motion.button
                            whileHover={{
                              scale: 1.1,
                              transition: { duration: 0.5 },
                            }}
  onClick={() => handleCategory(item)} className="px-2 mt-2 py-1 text-sm bg-gray-800 dark:bg-gray-300 rounded-lg">
            {item}
          </motion.button>
        </div>
        ))
      }
        </div>
        </div>
    )
};

export default Category;