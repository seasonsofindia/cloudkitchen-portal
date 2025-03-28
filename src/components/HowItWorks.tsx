
const steps = [
  {
    number: "01",
    title: "Choose a Kitchen",
    description: "Browse through our selection of cloud kitchens and cuisines.",
  },
  {
    number: "02",
    title: "Select Your Meals",
    description: "Add your favorite dishes from one or multiple kitchens to your cart.",
  },
  {
    number: "03",
    title: "Place Your Order",
    description: "Confirm your order, choose delivery options, and make payment.",
  },
  {
    number: "04",
    title: "Enjoy Your Food",
    description: "Track your order and enjoy your freshly prepared meals.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our cloud kitchen platform makes it easy to order from multiple kitchens at once
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="bg-background rounded-lg p-6 shadow-sm">
              <div className="text-4xl font-bold text-orange-500 mb-4">{step.number}</div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
