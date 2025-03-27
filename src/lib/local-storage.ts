
/**
 * مكتبة للتعامل مع التخزين المحلي لمتابعة المشاهدات والتقييمات
 */

// الحصول على المشاهدات الحالية لعنصر معين
export const getViews = (type: 'article' | 'statement' | 'book', id: string): number => {
  try {
    const key = `${type}_views`;
    const viewsData = localStorage.getItem(key);
    
    if (!viewsData) return 0;
    
    const viewsMap = JSON.parse(viewsData);
    return viewsMap[id] || 0;
  } catch (error) {
    console.error('خطأ في الحصول على المشاهدات:', error);
    return 0;
  }
};

// تحديث عدد المشاهدات
export const incrementViews = (type: 'article' | 'statement' | 'book', id: string): number => {
  try {
    const key = `${type}_views`;
    const viewsData = localStorage.getItem(key);
    
    const viewsMap = viewsData ? JSON.parse(viewsData) : {};
    const currentViews = viewsMap[id] || 0;
    const newViews = currentViews + 1;
    
    viewsMap[id] = newViews;
    localStorage.setItem(key, JSON.stringify(viewsMap));
    
    return newViews;
  } catch (error) {
    console.error('خطأ في تحديث المشاهدات:', error);
    return 0;
  }
};

// الحصول على متوسط التقييم وعدد المقيمين
export const getRating = (type: 'article' | 'statement' | 'book', id: string): { average: number; count: number } => {
  try {
    const key = `${type}_ratings`;
    const ratingsData = localStorage.getItem(key);
    
    if (!ratingsData) return { average: 0, count: 0 };
    
    const ratingsMap = JSON.parse(ratingsData);
    const itemRatings = ratingsMap[id] || { total: 0, count: 0 };
    
    return {
      average: itemRatings.count > 0 ? itemRatings.total / itemRatings.count : 0,
      count: itemRatings.count || 0
    };
  } catch (error) {
    console.error('خطأ في الحصول على التقييمات:', error);
    return { average: 0, count: 0 };
  }
};

// التحقق من قيام المستخدم بالتقييم مسبقاً
export const hasUserRated = (type: 'article' | 'statement' | 'book', id: string): boolean => {
  try {
    const key = `${type}_user_rated`;
    const userRatedData = localStorage.getItem(key);
    
    if (!userRatedData) return false;
    
    const userRatedMap = JSON.parse(userRatedData);
    return userRatedMap[id] || false;
  } catch (error) {
    console.error('خطأ في التحقق من تقييم المستخدم:', error);
    return false;
  }
};

// إضافة تقييم جديد
export const addRating = (type: 'article' | 'statement' | 'book', id: string, rating: number): { average: number; count: number } => {
  try {
    // التحقق من عدم قيام المستخدم بالتقييم مسبقاً
    const userRatedKey = `${type}_user_rated`;
    const userRatedData = localStorage.getItem(userRatedKey);
    const userRatedMap = userRatedData ? JSON.parse(userRatedData) : {};
    
    if (userRatedMap[id]) {
      // المستخدم قام بالتقييم مسبقاً، نعيد البيانات الحالية
      return getRating(type, id);
    }
    
    // تحديث بيانات التقييم
    const ratingsKey = `${type}_ratings`;
    const ratingsData = localStorage.getItem(ratingsKey);
    const ratingsMap = ratingsData ? JSON.parse(ratingsData) : {};
    
    if (!ratingsMap[id]) {
      ratingsMap[id] = { total: 0, count: 0 };
    }
    
    ratingsMap[id].total += rating;
    ratingsMap[id].count += 1;
    
    // حفظ البيانات
    localStorage.setItem(ratingsKey, JSON.stringify(ratingsMap));
    
    // تعليم المستخدم بأنه قام بالتقييم
    userRatedMap[id] = true;
    localStorage.setItem(userRatedKey, JSON.stringify(userRatedMap));
    
    return {
      average: ratingsMap[id].total / ratingsMap[id].count,
      count: ratingsMap[id].count
    };
  } catch (error) {
    console.error('خطأ في إضافة تقييم:', error);
    return { average: 0, count: 0 };
  }
};
