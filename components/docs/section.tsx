import { ChevronRight } from 'lucide-react';

interface DocSectionProps {
  title: string;
  id: string; 
  children: React.ReactNode;
}

const DocSection = ({ title, id, children }: DocSectionProps) => (
  <section id={id} className="mb-24 scroll-mt-28"> 
    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 group">
      <ChevronRight className="text-[#00f2ad] opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
      {title}
    </h2>
    <div className="text-gray-400 leading-7 space-y-4">
      {children}
    </div>
  </section>
);

export default DocSection;