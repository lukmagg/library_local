import { useTranslations } from "next-intl";

interface ChildProps {
  onChildEvent: (message: string) => void;
}

const Filter: React.FC<ChildProps> = ({ onChildEvent }) => {
  const t = useTranslations('Library');

  return (
    <div className="flex justify-center">
      <div className=" mt-2 mb-2 w-[35rem] rounded-md shadow-lg">
        <input
          onChange={(e) => onChildEvent(e.target.value)}
          type="text"
          name="search"
          id="search"
          className="pl-3 py-2 bg-green-100 block w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-green-600 text-xl leading-6"
          placeholder={t('Filter.search')}
        />
      </div>
    </div>
  );
};

export default Filter;
