export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-earth-400 to-sage-400 mt-auto text-earth-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-earth-50 mb-4">מרחב אבא אדמה</h3>
            <p className="text-earth-100">מקום של טבע, אמנות וקהילה במרכז הארץ</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-earth-50 mb-4">שעות פעילות</h3>
            <p className="text-earth-100">ראשון - חמישי: 9:00 - 17:00</p>
            <p className="text-earth-100">שישי: 9:00 - 13:00</p>
            <p className="text-earth-100">שבת: סגור</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-earth-50 mb-4">צור קשר</h3>
            <p className="text-earth-100">טלפון: 054-1234567</p>
            <p className="text-earth-100">דוא"ל: info@earthspace.co.il</p>
          </div>
        </div>
        <div className="border-t border-earth-50/20 mt-8 pt-8 text-center text-earth-100">
          <p>© {new Date().getFullYear()} מרחב אבא אדמה. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
}