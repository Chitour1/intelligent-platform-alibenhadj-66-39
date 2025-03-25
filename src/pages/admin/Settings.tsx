
import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import MetaTags from '@/components/MetaTags';
import { getSettings, saveSettings, SiteSettings } from '@/utils/dataService';

const Settings = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "",
    siteDescription: "",
    email: "",
    phone: "",
    address: "",
    facebookUrl: "",
    twitterUrl: "",
    youtubeUrl: "",
    instagramUrl: ""
  });

  const { toast } = useToast();

  // Load existing settings
  useEffect(() => {
    const currentSettings = getSettings();
    setSettings(currentSettings);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save settings to localStorage
    saveSettings(settings);
    
    toast({
      title: "تم حفظ الإعدادات",
      description: "تم حفظ إعدادات الموقع بنجاح",
    });
  };

  return (
    <div>
      <MetaTags title="لوحة التحكم - الإعدادات" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold">إعدادات الموقع</h1>
        <p className="text-gray-600 mt-2">
          قم بتعديل الإعدادات العامة للموقع
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">الإعدادات الأساسية</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="siteName">اسم الموقع</Label>
              <Input
                id="siteName"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="siteDescription">وصف الموقع</Label>
              <Textarea
                id="siteDescription"
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                rows={2}
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">معلومات الاتصال</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={settings.email}
                onChange={handleChange}
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                dir="ltr"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">العنوان</Label>
              <Input
                id="address"
                name="address"
                value={settings.address}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">روابط التواصل الاجتماعي</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="facebookUrl">فيسبوك</Label>
              <Input
                id="facebookUrl"
                name="facebookUrl"
                value={settings.facebookUrl}
                onChange={handleChange}
                placeholder="https://facebook.com/username"
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitterUrl">تويتر</Label>
              <Input
                id="twitterUrl"
                name="twitterUrl"
                value={settings.twitterUrl}
                onChange={handleChange}
                placeholder="https://twitter.com/username"
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtubeUrl">يوتيوب</Label>
              <Input
                id="youtubeUrl"
                name="youtubeUrl"
                value={settings.youtubeUrl}
                onChange={handleChange}
                placeholder="https://youtube.com/channel/id"
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagramUrl">انستغرام</Label>
              <Input
                id="instagramUrl"
                name="instagramUrl"
                value={settings.instagramUrl}
                onChange={handleChange}
                placeholder="https://instagram.com/username"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            حفظ الإعدادات
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
