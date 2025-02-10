import { Code } from "@phosphor-icons/react";
import { FormSubheader } from "@/components/common";

import { Button } from "@/components/ui";

import { useAppSelector } from "@/lib/redux/hooks";

import { technicalList } from "@/features/app-settings/constants/technical";
import { type InfoDrawerProps } from "@/features/app-settings/hooks/useAppInfoDrawer";

const TechHighlights = ({handleCloseDrawer}: InfoDrawerProps) => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  
  return (
  <section>
      <FormSubheader icon={Code} text="Technical Details" />
      <ul className="space-y-2">
        {technicalList.map((feature) => (
          <li
            key={feature.id}
            className="p-3"
          >
            <h1 className={`font-medium text-lg tracking-normal ${theme ? "text-secondary" : "text-dark"}`}>
              {feature.title}
            </h1>
            <p className={`mt-1 indent-2 ${theme ? "text-neutral": "text-darkGray"}`}>{feature.description}</p>
          </li>
        ))}
      </ul>
      <div className="m-4">
          <Button
            variant="primary"
          action={handleCloseDrawer}
            width="w-full"
          >
            Got It
          </Button>
      </div>
    </section>
  )
}

export default TechHighlights;
