
const Books = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Sort books by publication date (most recent first)
  const sortedBooks = [...booksData].sort((a, b) => {
    // If publication date exists, sort by it, otherwise use ID as fallback
    if (a.publicationDate && b.publicationDate) {
      // Simple string comparison for Arabic dates (since they're formatted consistently)
      return a.publicationDate > b.publicationDate ? -1 : 1;
    }
    // Sort by ID (most recent first) as fallback
    return b.id - a.id;
  });

  const filteredBooks = sortedBooks.filter((book) => {
    const matchesSearch = book.title.includes(searchQuery) || 
                         book.author.includes(searchQuery) || 
                         book.description.includes(searchQuery);
    
    const matchesTag = selectedTag ? book.tags.includes(selectedTag) : true;
    
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-navy text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern opacity-30"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">كتب الشيخ علي بن حاج</h1>
            <p className="text-xl text-gray-200 mb-6">
              مجموعة من المؤلفات الفكرية والشرعية التي تتناول قضايا الأمة وسبل الإصلاح
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-white w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="ابحث عن كتاب..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                className={cn(
                  "px-3 py-1 text-sm rounded-full border transition-colors",
                  !selectedTag
                    ? "bg-gold text-navy border-gold"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                )}
                onClick={() => setSelectedTag(null)}
              >
                الكل
              </button>
              {bookTags.map((tag) => (
                <button
                  key={tag}
                  className={cn(
                    "px-3 py-1 text-sm rounded-full border transition-colors",
                    selectedTag === tag
                      ? "bg-gold text-navy border-gold"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  )}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="section-container">
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book) => (
              <Link to={`/publications/books/${book.id}`} key={book.id} className="card group hover:shadow-lg transition-all">
                <div className="flex md:flex-col lg:flex-row gap-4 p-4">
                  <div className="relative w-1/3 md:w-full lg:w-1/3 aspect-[3/4] overflow-hidden rounded-md shadow-md">
                    <img 
                      src={book.cover} 
                      alt={book.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="w-2/3 md:w-full lg:w-2/3">
                    <h3 className="text-lg font-bold text-navy-dark mb-2 group-hover:text-gold transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                    <div className="flex items-center gap-3 text-gray-500 text-sm mb-2">
                      <div className="flex items-center">
                        <CalendarDays size={14} className="ml-1" aria-label="سنة الإصدار" />
                        <span>{book.year}</span>
                      </div>
                      <div className="flex items-center">
                        <FileText size={14} className="ml-1" />
                        {book.pages} صفحة
                      </div>
                    </div>
                    {book.publicationDate && (
                      <div className="text-xs text-gold mb-2">
                        تاريخ النشر: {book.publicationDate}
                      </div>
                    )}
                    <p className="text-sm text-gray-600 line-clamp-2">{book.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-500">لم يتم العثور على كتب تطابق معايير البحث</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Books;
