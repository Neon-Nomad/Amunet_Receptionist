import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Download, Sparkles, Video } from 'lucide-react';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import { studio, motion as motionApi } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const IMAGE_SIZES = [
  { value: '1024x1024', label: 'Square (1024x1024)' },
  { value: '1792x1024', label: 'Landscape (16:9)' },
  { value: '1024x1792', label: 'Portrait (9:16)' },
];

const VIDEO_RATIOS = [
  { value: '16:9', label: 'Landscape (16:9)' },
  { value: '9:16', label: 'Portrait (9:16)' },
  { value: '1:1', label: 'Square (1:1)' },
];

const Studio: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');

  // Image generation
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageSize, setImageSize] = useState('1024x1024');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  // Video generation
  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoRatio, setVideoRatio] = useState('16:9');
  const [duration, setDuration] = useState(15);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);

  const handleGenerateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setImageLoading(true);

    try {
      const response = await studio.generateImage({ prompt: imagePrompt, size: imageSize });
      setGeneratedImage(response.data.imageUrl);
      toast.success('Image generated successfully!');
    } catch (error) {
      toast.error('Failed to generate image');
    } finally {
      setImageLoading(false);
    }
  };

  const handleGenerateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setVideoLoading(true);

    try {
      const businessId = 'temp-business-id'; // Get from context/state
      const response = await motionApi.generateVideo({
        prompt: videoPrompt,
        aspectRatio: videoRatio,
        duration,
        businessId,
      });
      setGeneratedVideo(response.data.videoUrl);
      toast.success('Video generation started! This may take a few minutes.');
    } catch (error) {
      toast.error('Failed to generate video');
    } finally {
      setVideoLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Amunet Studio</h1>
        <p className="text-gray-400">Create stunning visuals with AI</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-dark-600">
        <button
          onClick={() => setActiveTab('image')}
          className={`px-6 py-3 font-medium transition-colors relative ${
            activeTab === 'image' ? 'text-primary' : 'text-gray-400 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <ImageIcon size={20} />
            Images
          </div>
          {activeTab === 'image' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={`px-6 py-3 font-medium transition-colors relative ${
            activeTab === 'video' ? 'text-primary' : 'text-gray-400 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <Video size={20} />
            Videos
          </div>
          {activeTab === 'video' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
      </div>

      {/* Image Tab */}
      {activeTab === 'image' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card>
            <h2 className="text-xl font-heading font-bold mb-4">Generate Image</h2>
            <form onSubmit={handleGenerateImage} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Describe your image
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:border-primary"
                  rows={5}
                  placeholder="A futuristic office with holographic displays and purple neon lighting..."
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  required
                />
              </div>

              <Select
                label="Size"
                options={IMAGE_SIZES}
                value={imageSize}
                onChange={(e) => setImageSize(e.target.value)}
              />

              <Button type="submit" className="w-full" loading={imageLoading}>
                <Sparkles size={18} />
                Generate Image
              </Button>
            </form>

            {/* Tips */}
            <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">💡 Pro Tips</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Be specific about style, colors, and mood</li>
                <li>• Include lighting and composition details</li>
                <li>• Mention any brand colors or themes</li>
              </ul>
            </div>
          </Card>

          {/* Preview */}
          <Card>
            <h2 className="text-xl font-heading font-bold mb-4">Preview</h2>
            {generatedImage ? (
              <div className="space-y-4">
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="w-full rounded-lg border border-dark-600"
                />
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Download size={18} />
                    Download
                  </Button>
                  <Button variant="secondary" className="flex-1">
                    Use in Post
                  </Button>
                </div>
              </div>
            ) : (
              <div className="aspect-square bg-dark-700 rounded-lg flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <ImageIcon size={64} className="mx-auto mb-4 opacity-50" />
                  <p>Your generated image will appear here</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Video Tab */}
      {activeTab === 'video' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card>
            <h2 className="text-xl font-heading font-bold mb-4">Generate Video</h2>
            <form onSubmit={handleGenerateVideo} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Describe your video
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:border-primary"
                  rows={5}
                  placeholder="A sleek product showcase with smooth camera movements and futuristic effects..."
                  value={videoPrompt}
                  onChange={(e) => setVideoPrompt(e.target.value)}
                  required
                />
              </div>

              <Select
                label="Aspect Ratio"
                options={VIDEO_RATIOS}
                value={videoRatio}
                onChange={(e) => setVideoRatio(e.target.value)}
              />

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Duration: {duration}s
                </label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="5"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <Button type="submit" className="w-full" loading={videoLoading}>
                <Sparkles size={18} />
                Generate Video
              </Button>

              {user?.role === 'admin' && (
                <Button variant="outline" className="w-full">
                  <Sparkles size={18} className="text-yellow-400" />
                  Generate with Sora (Premium)
                </Button>
              )}
            </form>

            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <h3 className="font-semibold text-yellow-400 mb-2"⚠️ Note</h3>
              <p className="text-sm text-gray-300">
                Video generation can take 3-5 minutes. You'll receive a notification when ready.
              </p>
            </div>
          </Card>

          {/* Preview */}
          <Card>
            <h2 className="text-xl font-heading font-bold mb-4">Preview</h2>
            {generatedVideo ? (
              <div className="space-y-4">
                <video
                  src={generatedVideo}
                  controls
                  className="w-full rounded-lg border border-dark-600"
                />
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Download size={18} />
                    Download
                  </Button>
                  <Button variant="secondary" className="flex-1">
                    Use in Post
                  </Button>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-dark-700 rounded-lg flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Video size={64} className="mx-auto mb-4 opacity-50" />
                  <p>Your generated video will appear here</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default Studio;