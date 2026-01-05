import { useState, useRef } from 'react';
import { ArrowLeft, X, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export function CreatePost() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = async () => {
    if (!selectedImage) return;

    setIsSharing(true);
    
    // Simulate sharing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Save to localStorage for persistence
    const savedPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
    savedPosts.unshift({
      id: Date.now().toString(),
      image: selectedImage,
      caption,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('userPosts', JSON.stringify(savedPosts));

    toast({
      title: 'Post compartilhado!',
      description: 'Seu post foi publicado com sucesso.',
    });

    setIsSharing(false);
    navigate('/');
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setCaption('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background border-b border-border z-10">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold">Nova publicação</h1>
          <button
            onClick={handleShare}
            disabled={!selectedImage || isSharing}
            className="text-primary font-semibold disabled:opacity-50"
          >
            {isSharing ? 'Publicando...' : 'Compartilhar'}
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="p-4">
        {selectedImage ? (
          <div className="space-y-4">
            {/* Preview */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                onClick={handleClearImage}
                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Caption input */}
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Escreva uma legenda..."
              className="w-full h-32 p-3 bg-secondary rounded-lg resize-none text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-lg bg-secondary flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors"
          >
            <ImageIcon className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-sm">Toque para selecionar uma foto</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}
