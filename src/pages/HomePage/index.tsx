import { Separator } from "@/components/ui/separator";

export default () => {
  return (
    <div className="flex-1 flex flex-col justify-items-start md:justify-center items-start md:items-center">
      <div className="leading-15 text-sm md:text-2xl font-bold italic text-foreground">
        <p className="font-serif text-5xl md:text-9xl font-black not-italic text-shadow-lg/30 text-shadow-primary">
          Gnohznew
        </p>
        <Separator className="mt-3 md:mt-9 mb-5 md:mb-12" />
        <p>The most reversed language in the world.</p>
        <p>世界上最倒着的语言。</p>
        <p>ihseijgnahs iuz oad ehz ed uynay。</p>
      </div>
    </div>
  );
};
