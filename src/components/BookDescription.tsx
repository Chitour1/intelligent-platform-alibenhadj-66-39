
import { Separator } from "@/components/ui/separator";
import { BookContent } from "@/data/bookContent";

interface BookDescriptionProps {
  content: BookContent;
}

const BookDescription = ({ content }: BookDescriptionProps) => {
  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-3xl font-bold text-navy-dark mb-4 text-center">{content.title}</h1>
      
      <p className="mb-6 text-gray-700 leading-relaxed">
        {content.introduction}
      </p>

      {content.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          <h2 className="text-2xl font-bold text-navy-dark mb-4">
            {section.title}
          </h2>
          
          {section.content && (
            <p className="mb-4 text-gray-700 leading-relaxed">
              {section.content}
            </p>
          )}

          {section.points && (
            <ul className="mb-4 space-y-2">
              {section.points.map((point, pointIndex) => (
                <li key={pointIndex} className="text-gray-700 leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          )}

          {section.subsections && section.subsections.length > 0 && (
            <div className="space-y-6 mt-6">
              {section.subsections.map((subsection, subsectionIndex) => (
                <div key={subsectionIndex} className="pr-4 border-r-2 border-gray-200">
                  <h3 className="text-xl font-bold text-navy mb-2">
                    {subsection.title}
                  </h3>
                  
                  {subsection.content && (
                    <p className="mb-2 text-gray-700 leading-relaxed">
                      {subsection.content}
                    </p>
                  )}

                  {subsection.points && (
                    <ul className="space-y-1 list-disc pr-6">
                      {subsection.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-gray-700 leading-relaxed">
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {section.conclusion && (
            <p className="mt-4 text-gray-700 leading-relaxed font-medium">
              {section.conclusion}
            </p>
          )}

          {sectionIndex < content.sections.length - 1 && (
            <Separator className="my-6" />
          )}
        </div>
      ))}
    </div>
  );
};

export default BookDescription;
