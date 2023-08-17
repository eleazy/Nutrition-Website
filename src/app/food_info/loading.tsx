import FoodList from "@/components/foodList";

export default function Loading() {
  const loadImages = ["", "", "", "", ""];
  const loadImage =
    "https://sujeitoprogramador.com/wp-content/uploads/2020/11/1_9EBHIOzhE1XfMYoKz1JcsQ.gif";
  return (
    <div className={``}>
      <FoodList links={loadImages.fill(loadImage)} />
    </div>
  );
}
