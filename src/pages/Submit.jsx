import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt, FaCheck } from 'react-icons/fa';
import { supabase, uploadPhoto } from '../lib/supabase';

const initialForm = {
  name: '',
  maiden_name: '',
  email: '',
  phone: '',
  city: '',
  occupation: '',
  family: '',
  fun_fact: '',
  linkedin: '',
  instagram: '',
  attending: 'yes',
};

export default function Submit() {
  const [form, setForm] = useState(initialForm);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [seniorPhoto, setSeniorPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSeniorPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSeniorPhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.city) {
      setError('Please fill in your name, email, and city.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      let photo_url = null;
      let senior_photo_url = null;

      if (photo) {
        try { photo_url = await uploadPhoto(photo, 'current'); } catch (_) {}
      }
      if (seniorPhoto) {
        try { senior_photo_url = await uploadPhoto(seniorPhoto, 'senior'); } catch (_) {}
      }

      const { error: dbError } = await supabase.from('classmates').insert([{
        ...form,
        photo_url,
        senior_photo_url,
      }]);

      if (dbError) throw dbError;
      setSuccess(true);
    } catch (err) {
      setError('Something went wrong. Please try again or contact the committee directly.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{
        paddingTop: 'var(--nav-height)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 40px',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(200,16,46,0.15)',
            border: '2px solid var(--cardinal-red)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
            fontSize: '2rem',
            color: 'var(--cardinal-red)',
          }}>
            <FaCheck />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            marginBottom: 16,
          }}>
            YOU'RE <span style={{ color: 'var(--cardinal-red)' }}>IN!</span>
          </h2>
          <p style={{
            color: 'var(--silver)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            maxWidth: 500,
            margin: '0 auto 12px',
          }}>
            {form.name}, your registration is confirmed. We'll be in touch with reunion details.
          </p>
          <p style={{ color: 'var(--silver)', fontSize: '0.9rem', marginBottom: 40 }}>
            Check <strong>{form.email}</strong> for a confirmation email.
          </p>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            color: 'var(--cardinal-red)',
          }}>
            ONCE A RAIDER, ALWAYS A RAIDER.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="page-header">
        <div className="badge badge-red" style={{ marginBottom: 20 }}>✦ July 2027 ✦</div>
        <h1>REGISTER FOR <span>REUNION</span></h1>
        <p>Submit your info, RSVP for the weekend, and let your classmates know you're coming.</p>
        <div className="red-line" />
      </div>

      <section style={{ padding: '60px 40px' }}>
        <div style={{ maxWidth: 750, margin: '0 auto' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

            {/* Section: Who Are You */}
            <FormSection title="WHO ARE YOU" number="01">
              <div className="grid-2" style={{ gap: 16 }}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" placeholder="First Last" value={form.name} onChange={set('name')} required />
                </div>
                <div className="form-group">
                  <label>Maiden Name</label>
                  <input type="text" placeholder="If applicable" value={form.maiden_name} onChange={set('maiden_name')} />
                </div>
              </div>
              <div className="grid-2" style={{ gap: 16, marginTop: 16 }}>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="(317) 555-0100" value={form.phone} onChange={set('phone')} />
                </div>
              </div>
            </FormSection>

            {/* Section: Where Are You Now */}
            <FormSection title="WHERE ARE YOU NOW" number="02">
              <div className="grid-2" style={{ gap: 16 }}>
                <div className="form-group">
                  <label>Current City *</label>
                  <input type="text" placeholder="City, State" value={form.city} onChange={set('city')} required />
                </div>
                <div className="form-group">
                  <label>Occupation</label>
                  <input type="text" placeholder="What do you do?" value={form.occupation} onChange={set('occupation')} />
                </div>
              </div>
              <div className="form-group" style={{ marginTop: 16 }}>
                <label>Family</label>
                <input type="text" placeholder="Married? Kids? Pets count." value={form.family} onChange={set('family')} />
              </div>
              <div className="form-group" style={{ marginTop: 16 }}>
                <label>Fun Fact</label>
                <textarea
                  placeholder="Tell us something interesting. Something no one would guess. Go."
                  value={form.fun_fact}
                  onChange={set('fun_fact')}
                  style={{ minHeight: 80 }}
                />
              </div>
            </FormSection>

            {/* Section: Social Links */}
            <FormSection title="SOCIAL LINKS" number="03">
              <div className="grid-2" style={{ gap: 16 }}>
                <div className="form-group">
                  <label>LinkedIn URL</label>
                  <input type="url" placeholder="https://linkedin.com/in/you" value={form.linkedin} onChange={set('linkedin')} />
                </div>
                <div className="form-group">
                  <label>Instagram Handle</label>
                  <input type="text" placeholder="@yourhandle" value={form.instagram} onChange={set('instagram')} />
                </div>
              </div>
            </FormSection>

            {/* Section: Photos */}
            <FormSection title="PHOTOS" number="04">
              <div className="grid-2" style={{ gap: 16 }}>
                <div className="form-group">
                  <label>Current Photo</label>
                  <PhotoUpload
                    preview={photoPreview}
                    onChange={handlePhoto}
                    label="Upload a current photo"
                  />
                </div>
                <div className="form-group">
                  <label>Senior Photo (2007)</label>
                  <PhotoUpload
                    preview={seniorPhoto ? '✓ Senior photo selected' : null}
                    onChange={handleSeniorPhoto}
                    label="Upload your senior photo"
                    isText={!!seniorPhoto}
                  />
                </div>
              </div>
              <p style={{ color: 'rgba(191,195,199,0.4)', fontSize: '0.75rem', marginTop: 10 }}>
                Photos are used for the Class Directory and Then & Now section. JPG or PNG, max 10MB.
              </p>
            </FormSection>

            {/* Section: RSVP */}
            <FormSection title="ARE YOU COMING?" number="05">
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { value: 'yes', label: "Yes! I'll be there 🎉" },
                  { value: 'maybe', label: 'Maybe — I\'m trying' },
                  { value: 'no', label: 'Can\'t make it this time' },
                ].map(option => (
                  <label
                    key={option.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '12px 20px',
                      borderRadius: 6,
                      border: `2px solid ${form.attending === option.value ? 'var(--cardinal-red)' : 'rgba(255,255,255,0.08)'}`,
                      background: form.attending === option.value ? 'rgba(200,16,46,0.08)' : 'rgba(255,255,255,0.03)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontSize: '0.88rem',
                      fontWeight: form.attending === option.value ? 600 : 400,
                      color: form.attending === option.value ? 'var(--off-white)' : 'var(--silver)',
                    }}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value={option.value}
                      checked={form.attending === option.value}
                      onChange={set('attending')}
                      style={{ display: 'none' }}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </FormSection>

            {/* Error */}
            {error && (
              <div style={{
                background: 'rgba(200,16,46,0.08)',
                border: '1px solid rgba(200,16,46,0.3)',
                borderRadius: 6,
                padding: '12px 16px',
                color: '#ff6b6b',
                fontSize: '0.88rem',
                marginBottom: 16,
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? '#666' : 'var(--cardinal-red)',
                color: '#fff',
                padding: '18px 40px',
                borderRadius: 6,
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'all 0.25s',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 8px 30px rgba(200,16,46,0.35)',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#a50d24'; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'var(--cardinal-red)'; }}
            >
              {loading ? 'Submitting...' : 'Submit Registration →'}
            </button>

            <p style={{ color: 'rgba(191,195,199,0.4)', fontSize: '0.75rem', textAlign: 'center', marginTop: 12 }}>
              Your information will only be shared with other Cardinal Ritter Class of 2007 classmates.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

function FormSection({ title, number, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 24,
        paddingBottom: 16,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'var(--cardinal-red)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: '0.85rem',
          color: '#fff',
          flexShrink: 0,
        }}>{number}</div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.2rem',
          letterSpacing: '0.08em',
          color: 'var(--silver)',
        }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function PhotoUpload({ preview, onChange, label, isText }) {
  return (
    <label style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      height: 140,
      borderRadius: 8,
      border: preview ? '2px solid rgba(200,16,46,0.4)' : '2px dashed rgba(255,255,255,0.1)',
      background: preview ? 'rgba(200,16,46,0.04)' : 'rgba(255,255,255,0.02)',
      cursor: 'pointer',
      transition: 'all 0.2s',
      overflow: 'hidden',
      position: 'relative',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,16,46,0.5)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = preview ? 'rgba(200,16,46,0.4)' : 'rgba(255,255,255,0.1)'; }}
    >
      <input type="file" accept="image/*" onChange={onChange} style={{ display: 'none' }} />
      {preview && !isText ? (
        <img
          src={preview}
          alt="Preview"
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
        />
      ) : isText ? (
        <>
          <FaCheck style={{ color: 'var(--cardinal-red)', fontSize: '1.5rem' }} />
          <span style={{ color: 'var(--cardinal-red)', fontSize: '0.8rem', fontWeight: 600 }}>{preview}</span>
        </>
      ) : (
        <>
          <FaCloudUploadAlt style={{ color: 'var(--silver)', fontSize: '1.8rem' }} />
          <span style={{ color: 'var(--silver)', fontSize: '0.8rem', textAlign: 'center', padding: '0 10px' }}>{label}</span>
        </>
      )}
    </label>
  );
}
