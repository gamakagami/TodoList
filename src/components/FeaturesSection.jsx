import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
  const features = [
    { title: "Easy to Use", description: "A clean and simple interface to manage your tasks seamlessly." },
    { title: "Stay on Track", description: "Set deadlines, prioritize tasks, and never miss a thing." },
    { title: "Cloud Sync", description: "Access your to-do list from any device, anywhere." },
  ];

  return (
    <div className="text-center w-full max-w-4xl">
      <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-10">
        {features.map((feature, index) => (
          <FeatureCard key={index} title={feature.title} description={feature.description} />
        ))}
      </div>
    </div>
  );
}
