import { Separator } from "@/components/ui/separator";

export default () => {
  return (
    <div className="flex-1 flex flex-col justify-start md:justify-center items-center">
      <div className="leading-15 md:leading-30 text-[clamp(1rem,3vw,3rem)] md:text-2xl font-bold italic text-foreground">
        <p className="font-serif text-[clamp(1rem,15vw,9rem)] font-black not-italic text-shadow-lg/100 text-shadow-accent">
          Gnohznew
        </p>
        <Separator className="mt-9 md:mt-20 mb-5 md:mb-12" />
        <p>The most reversed language in the world.</p>
        <p>世界上最倒着的语言。</p>
        <p>Ihseijgnahs iuz oadehz ed uynay。</p>
      </div>
    </div>
  );
};
