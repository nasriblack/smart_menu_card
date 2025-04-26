import { MenuCategory } from "../../data/menuData";

type Props = {
  category: MenuCategory;
};

const PictureCategoryMenuList = ({ category }: Props) => {
  return (
    <div
      className="h-[35vh] bg-fixed bg-center bg-cover relative"
      style={{
        backgroundColor: !category.with_img ? "#2c2c2c" : undefined,
        backgroundImage: category.with_img
          ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${category.backgroundImage})`
          : undefined,
        backgroundPosition: "center 10%",
      }}
    >
      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h2 className="text-5xl font-bold mb-4">{category.name}</h2>
        <p className="text-xl italic text-gray-300">- {category.subtitle} -</p>
      </div>
    </div>
  );
};

export default PictureCategoryMenuList;
