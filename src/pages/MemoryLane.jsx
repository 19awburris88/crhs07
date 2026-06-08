import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCloudUploadAlt, FaCheck } from 'react-icons/fa';
import { supabase, uploadPhoto } from '../lib/supabase';
import { memoryCategories, mockMemories } from '../lib/mockData';

function MemoryCard({ memory, index }) {
  const hasPhoto = !!memory.photo_url;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="card"
      style={{ overflow: 'hidden' }}
    >
      <div style={{
        height: 200,
        position: 'relative',
        overflow: 'hidden',
        background: memory.gradient || '#1a1a1a',
      }}>
        {hasPhoto ? (
          <img
            src={memory.photo_url}
            alt={memory.caption || 'Memory'}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.6rem',
              color: '#fff',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              lineHeight: 1.2,
              textAlign: 'center',
              padding: '0 20px',
              position: 'relative',
              zIndex: 1,
            }}>{memory.title}</div>
          </div>
        )}

        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />

        <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
          <span className="badge badge-red" style={{ fontSize: '0.65rem' }}>
            {memory.category}
          </span>
        </div>

        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          padding: '20px 14px 12px',
          zIndex: 2,
        }}>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem', margin: 0 }}>
            {memory.caption}
          </p>
        </div>
      </div>

      <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--silver)', fontSize: '0.78rem' }}>
          {memory.name ? `Submitted by ${memory.name}` : 'Class of 2007 Archive'}
        </span>
        {hasPhoto && (
          <span style={{
            fontSize: '0.65rem',
            padding: '3px 8px',
            borderRadius: 10,
            background: 'rgba(200,16,46,0.08)',
            color: 'var(--cardinal-red)',
            fontWeight: 600,
            letterSpacing: '0.06em',
          }}>
            CLASSMATE
          </span>
        )}
      </div>
    </motion.div>
  );
}

const SUBMIT_CATEGORIES = memoryCategories.filter(c => c !== 'All');

function SubmitMemoryForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', category: SUBMIT_CATEGORIES[0], caption: '' });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const setField = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !photo) {
      setError('Please enter your name and upload a photo.');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      let photo_url = null;
      try { photo_url = await uploadPhoto(photo, 'memories'); } catch (_) {}

      const { error: dbError } = await supabase.from('memories').insert([{
        name: form.name,
        category: form.category,
        caption: form.caption,
        photo_url,
        approved: false,
      }]);

      if (dbError) throw dbError;
      onSuccess(form.name);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 6,
    padding: '10px 14px',
    color: 'var(--off-white)',
    fontSize: '0.9rem',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    fontSize: '0.78rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    color: 'var(--silver)',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: 6,
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="grid-2" style={{ gap: 16 }}>
        <div>
          <label style={labelStyle}>Your Name *</label>
          <input
            type="text"
            placeholder="First Last"
            value={form.name}
            onChange={setField('name')}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Category *</label>
          <select
            value={form.category}
            onChange={setField('category')}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            {SUBMIT_CATEGORIES.map(cat => (
              <option key={cat} value={cat} style={{ background: '#222' }}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Caption</label>
        <textarea
          placeholder="Tell us what's happening in this photo..."
          value={form.caption}
          onChange={setField('caption')}
          style={{ ...inputStyle, minHeight: 72, resize: 'vertical' }}
        />
      </div>

      <div>
        <label style={labelStyle}>Photo *</label>
        <label style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          minHeight: 120,
          borderRadius: 8,
          border: photoPreview ? '2px solid rgba(200,16,46,0.4)' : '2px dashed rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.02)',
          cursor: 'pointer',
          transition: 'border-color 0.2s',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
          {photoPreview ? (
            <>
              <img
                src={photoPreview}
                alt="Preview"
                style={{ width: '100%', maxHeight: 280, objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                background: 'rgba(200,16,46,0.85)',
                borderRadius: 4,
                padding: '4px 10px',
                fontSize: '0.72rem',
                fontWeight: 600,
                color: '#fff',
              }}>
                Change Photo
              </div>
            </>
          ) : (
            <>
              <FaCloudUploadAlt style={{ color: 'var(--silver)', fontSize: '1.8rem' }} />
              <span style={{ color: 'var(--silver)', fontSize: '0.82rem', textAlign: 'center' }}>
                Click to upload · JPG or PNG
              </span>
            </>
          )}
        </label>
      </div>

      {error && (
        <div style={{
          background: 'rgba(200,16,46,0.08)',
          border: '1px solid rgba(200,16,46,0.3)',
          borderRadius: 6,
          padding: '10px 14px',
          color: '#ff6b6b',
          fontSize: '0.85rem',
        }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        style={{
          background: submitting ? '#555' : 'var(--cardinal-red)',
          color: '#fff',
          padding: '14px 32px',
          borderRadius: 6,
          fontSize: '0.9rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: submitting ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
          boxShadow: submitting ? 'none' : '0 6px 20px rgba(200,16,46,0.3)',
          border: 'none',
        }}
      >
        {submitting ? 'Submitting...' : 'Submit Memory →'}
      </button>

      <p style={{ color: 'rgba(191,195,199,0.4)', fontSize: '0.73rem', textAlign: 'center', margin: 0 }}>
        All submissions are reviewed before appearing in the gallery.
      </p>
    </form>
  );
}

export default function MemoryLane() {
  const [active, setActive] = useState('All');
  const [realMemories, setRealMemories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [successName, setSuccessName] = useState('');

  useEffect(() => {
    supabase
      .from('memories')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setRealMemories(data);
      });
  }, []);

  const allMemories = [...realMemories, ...mockMemories];
  const filtered = active === 'All' ? allMemories : allMemories.filter(m => m.category === active);

  const handleSuccess = (name) => {
    setSuccessName(name);
    setShowForm(false);
  };

  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="page-header">
        <div className="badge badge-red" style={{ marginBottom: 20 }}>✦ Archive ✦</div>
        <h1>MEMORY <span>LANE</span></h1>
        <p>Sports, homecoming, prom, spirit week, senior trip, graduation. It all happened.</p>
        <div className="red-line" />
      </div>

      {/* Category Filter */}
      <div style={{
        background: 'var(--charcoal)',
        padding: '20px 40px',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        position: 'sticky',
        top: 'var(--nav-height)',
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {memoryCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: 20,
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                background: active === cat ? 'var(--cardinal-red)' : 'rgba(255,255,255,0.05)',
                color: active === cat ? '#fff' : 'var(--silver)',
                border: active === cat ? 'none' : '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.2s',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <section className="section">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.map((memory, i) => (
              <MemoryCard key={memory.id} memory={memory} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Submit a Memory */}
      <div style={{ maxWidth: 760, margin: '0 auto 80px', padding: '0 40px' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--charcoal) 0%, rgba(200,16,46,0.06) 100%)',
          border: '1px solid rgba(200,16,46,0.2)',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ padding: '36px 40px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  marginBottom: 8,
                  lineHeight: 1.1,
                }}>
                  GOT PHOTOS FROM <span style={{ color: 'var(--cardinal-red)' }}>BACK IN THE DAY?</span>
                </h3>
                <p style={{ color: 'var(--silver)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                  Homecoming, prom, sports, senior trip, graduation — drop them here. We review
                  every submission before it goes live.
                </p>
              </div>
              <button
                onClick={() => { setShowForm(!showForm); setSuccessName(''); }}
                style={{
                  background: showForm ? 'rgba(255,255,255,0.06)' : 'var(--cardinal-red)',
                  color: '#fff',
                  border: showForm ? '1px solid rgba(255,255,255,0.12)' : 'none',
                  padding: '11px 24px',
                  borderRadius: 6,
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {showForm ? 'Cancel' : 'Submit a Memory +'}
              </button>
            </div>
          </div>

          {/* Success banner */}
          <AnimatePresence>
            {successName && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  margin: '0 40px 28px',
                  background: 'rgba(200,16,46,0.08)',
                  border: '1px solid rgba(200,16,46,0.3)',
                  borderRadius: 8,
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'var(--cardinal-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <FaCheck style={{ color: '#fff', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 2, fontSize: '0.9rem' }}>
                    Thanks, {successName}!
                  </div>
                  <div style={{ color: 'var(--silver)', fontSize: '0.82rem' }}>
                    Your memory has been submitted and will appear in the gallery once reviewed.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsible form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  padding: '28px 40px 40px',
                }}>
                  <SubmitMemoryForm onSuccess={handleSuccess} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
