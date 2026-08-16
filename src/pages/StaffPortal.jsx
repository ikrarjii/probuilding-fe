import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiDownload,
  FiGrid,
  FiList,
  FiLogOut,
  FiMapPin,
  FiMic,
  FiSearch,
  FiShield,
  FiTag,
  FiUserPlus,
  FiUsers,
  FiX,
  FiZap,
} from 'react-icons/fi';
import {
  ApiError,
  assignPanitia,
  clearStaffToken,
  createStaffUser,
  downloadStaffParticipantTicket,
  getAuditLogs,
  getEventAssignments,
  getStaffEvents,
  getStaffParticipants,
  getStaffStatistics,
  getStaffToken,
  getStaffUsers,
  recordStaffDailyCheckin,
  recordStaffParticipantCheckin,
  recordStaffTalkshowAttendance,
  setStaffToken,
  staffLogin,
  staffLogout,
  staffMe,
  unassignPanitia,
  updateStaffUser,
} from '../api/client';
import styles from './StaffPortal.module.scss';

const roleLabels = {
  super_admin: 'Super Admin',
  panitia: 'Panitia',
  vendor: 'Vendor',
};

const roleContent = {
  super_admin: {
    label: 'Event command center',
    title: 'Kendali event dalam satu ruang.',
    description:
      'Pantau registrasi, kesiapan program, tim operasional, dan aktivitas check-in secara menyeluruh.',
  },
  panitia: {
    label: 'Venue operations',
    title: 'Operasional event yang lebih cepat.',
    description:
      'Temukan peserta, validasi tiket, dan catat kehadiran untuk event yang ditugaskan kepada Anda.',
  },
  vendor: {
    label: 'Event insights',
    title: 'Statistik event, tanpa data pribadi.',
    description:
      'Lihat pertumbuhan registrasi dan kehadiran event melalui ringkasan agregat yang aman.',
  },
};

function displayError(error) {
  if (error instanceof ApiError) return error.message;
  return 'Terjadi kesalahan. Silakan coba lagi.';
}

function formatDate(value, options = {}) {
  if (!value) return '-';
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options,
  }).format(new Date(`${value}T00:00:00`));
}

function formatTime(value, timeZone = 'Asia/Makassar') {
  if (!value) return '-';
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone,
  }).format(new Date(value));
}

export default function StaffPortal() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [error, setError] = useState('');

  const establishSession = useCallback(async () => {
    const [identity, eventRows] = await Promise.all([staffMe(), getStaffEvents()]);
    setUser(identity.user);
    setEvents(eventRows);
    setSelectedSlug((current) => current || eventRows[0]?.slug || '');
  }, []);

  useEffect(() => {
    let active = true;

    async function restore() {
      if (!getStaffToken()) {
        setReady(true);
        return;
      }

      try {
        await establishSession();
      } catch {
        clearStaffToken();
        if (active) setUser(null);
      } finally {
        if (active) setReady(true);
      }
    }

    restore();
    return () => {
      active = false;
    };
  }, [establishSession]);

  async function handleLogin(credentials) {
    setError('');
    try {
      const session = await staffLogin(credentials);
      setStaffToken(session.token);
      await establishSession();
    } catch (loginError) {
      clearStaffToken();
      setError(displayError(loginError));
      throw loginError;
    }
  }

  async function handleLogout() {
    try {
      await staffLogout();
    } finally {
      clearStaffToken();
      setUser(null);
      setEvents([]);
      setSelectedSlug('');
    }
  }

  if (!ready) return <LoadingState fullscreen label='Menyiapkan ruang kerja' />;
  if (!user) return <LoginPanel onLogin={handleLogin} error={error} />;

  const selectedEvent = events.find((event) => event.slug === selectedSlug) || events[0] || null;

  return (
    <StaffWorkspace
      user={user}
      events={events}
      selectedEvent={selectedEvent}
      onSelectEvent={setSelectedSlug}
      onLogout={handleLogout}
    />
  );
}

function BrandLogo({ inverse = false, compact = false }) {
  return (
    <div
      className={`${styles.brand} ${inverse ? styles.brandInverse : ''} ${compact ? styles.brandCompact : ''}`}
    >
      <img src='/images/logo-probuild.png' alt='ProBuild INTIM' />
      <span className={styles.brandText}>
        <strong>
          <i className={styles.brandRed}>Pro</i>
          <i className={styles.brandGreen}>Build</i> <i className={styles.brandBlue}>INT</i>
          <i className={styles.brandOrange}>IM</i>
        </strong>
        <em>
          <i className={styles.brandRed}>2</i>
          <i className={styles.brandGreen}>0</i>
          <i className={styles.brandBlue}>2</i>
          <i className={styles.brandOrange}>6</i>
        </em>
      </span>
    </div>
  );
}

function LoginPanel({ onLogin, error }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await onLogin({ ...form, device_name: 'staff-web' });
    } catch {
      // The parent renders the safe API error.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={styles.loginPage}>
      <div className={styles.loginShell}>
        <section className={styles.loginBrandPanel}>
          <BrandLogo inverse />
          <div className={styles.loginBrandCopy}>
            <span className={styles.livePill}>
              <i /> ProBuild INTIM 2026
            </span>
            <h1>Ruang kendali ProBuild INTIM</h1>
            <p>Kelola registrasi, check-in, dan operasional event.</p>
          </div>
          <div className={styles.loginEventMeta}>
            <div>
              <FiCalendar />
              <strong>24–27 September 2026</strong>
            </div>
            <div>
              <FiMapPin />
              <strong>SMMCC Makassar</strong>
            </div>
          </div>
        </section>

        <section className={styles.loginFormPanel}>
          <div className={styles.loginFormInner}>
            <div className={styles.mobileLoginBrand}>
              <BrandLogo />
            </div>
            <div className={styles.loginHeading}>
              <span className={styles.sectionLabel}>Staff access</span>
              <h2>Selamat datang kembali.</h2>
              <p>Masuk dengan akun Super Admin, Panitia, atau Vendor Anda.</p>
            </div>
            {error && <Alert tone='error' message={error} />}
            <form onSubmit={submit} className={styles.formStack}>
              <FormField label='Email'>
                <input
                  type='email'
                  autoComplete='username'
                  required
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder='nama@perusahaan.com'
                />
              </FormField>
              <FormField label='Password'>
                <input
                  type='password'
                  autoComplete='current-password'
                  required
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                  placeholder='Masukkan password'
                />
              </FormField>
              <button className={styles.primaryButton} disabled={submitting}>
                <span>{submitting ? 'Memeriksa akses...' : 'Masuk ke dashboard'}</span>
                {!submitting && <FiArrowRight />}
              </button>
            </form>
            <div className={styles.loginSecurity}>
              <FiShield />
              <span>Akses terenkripsi dan dibatasi berdasarkan peran.</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StaffWorkspace({ user, events, selectedEvent, onSelectEvent, onLogout }) {
  const isAdmin = user.roles.includes('super_admin');
  const role = user.roles[0] || 'vendor';
  const isPanitia = role === 'panitia' && !isAdmin;
  const canOperate = Boolean(selectedEvent?.capabilities.operations);
  const [tab, setTab] = useState(isPanitia ? 'participants' : 'statistics');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const copy = roleContent[role] || roleContent.vendor;
  const navigation = useMemo(() => {
    if (isPanitia) {
      return canOperate
        ? [
            { id: 'statistics', label: 'Overview', icon: FiBarChart2 },
            { id: 'participants', label: 'Check-in Peserta', icon: FiCheckCircle },
          ]
        : [];
    }

    const items = [{ id: 'statistics', label: 'Overview', icon: FiBarChart2 }];
    if (canOperate) items.push({ id: 'participants', label: 'Peserta', icon: FiUsers });
    if (isAdmin) items.push({ id: 'program', label: 'Event & Talkshow', icon: FiCalendar });
    if (canOperate) items.push({ id: 'operations', label: 'Check-in', icon: FiCheckCircle });
    if (isAdmin) items.push({ id: 'users', label: 'Tim & Akses', icon: FiShield });
    if (isAdmin) items.push({ id: 'audit', label: 'Audit Log', icon: FiList });
    return items;
  }, [canOperate, isAdmin, isPanitia]);

  useEffect(() => {
    if (!navigation.some((item) => item.id === tab)) {
      setTab(navigation[0]?.id || (isPanitia ? 'participants' : 'statistics'));
    }
  }, [isPanitia, navigation, tab]);

  return (
    <main className={`${styles.workspace} ${sidebarCollapsed ? styles.workspaceCollapsed : ''}`}>
      <aside className={styles.sidebar}>
        <div>
          <BrandLogo inverse />
          <p className={styles.workspaceName}>Event Operations</p>
        </div>
        <button
          type='button'
          className={styles.sidebarToggle}
          aria-label={sidebarCollapsed ? 'Buka sidebar' : 'Tutup sidebar'}
          aria-expanded={!sidebarCollapsed}
          title={sidebarCollapsed ? 'Buka sidebar' : 'Tutup sidebar'}
          onClick={() => setSidebarCollapsed((current) => !current)}
        >
          {sidebarCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
        <DashboardNavigation items={navigation} active={tab} onChange={setTab} />
        <div className={styles.sidebarFooter}>
          <div className={styles.systemStatus}>
            <i />
            <span>
              <small>System status</small>
              <strong>Operational</strong>
            </span>
          </div>
          <div className={styles.userCard}>
            <span className={styles.avatar}>{user.name.slice(0, 1).toUpperCase()}</span>
            <span>
              <strong>{user.name}</strong>
              <small>{roleLabels[role] || role}</small>
            </span>
            <button onClick={onLogout} title='Keluar' aria-label='Keluar'>
              <FiLogOut />
            </button>
          </div>
        </div>
      </aside>

      <section className={styles.dashboardMain}>
        <header className={styles.mobileHeader}>
          <BrandLogo compact />
          <button onClick={onLogout} aria-label='Keluar'>
            <FiLogOut />
          </button>
        </header>
        <div className={`${styles.dashboardContent} ${isPanitia ? styles.panitiaContent : ''}`}>
          {isPanitia ? (
            <header className={styles.panitiaHeader}>
              <div>
                <span className={styles.sectionLabel}>Operasional Panitia</span>
                <h1>Check-in peserta</h1>
                <p>Pilih hari event, cari peserta yang datang, lalu konfirmasi kehadiran.</p>
              </div>
            </header>
          ) : (
            <header className={styles.welcomeHeader}>
              <div>
                <span className={styles.sectionLabel}>{copy.label}</span>
                <h1>{copy.title}</h1>
                <p>{copy.description}</p>
              </div>
              <span className={styles.rolePill}>
                <FiShield /> {roleLabels[role] || role}
              </span>
            </header>
          )}

          <EventContext
            events={events}
            selectedEvent={selectedEvent}
            onSelectEvent={onSelectEvent}
            compact={isPanitia}
          />

          <div className={styles.mobileNavigation}>
            <DashboardNavigation items={navigation} active={tab} onChange={setTab} />
          </div>

          {!selectedEvent && <EmptyState title='Belum ada event yang dapat diakses.' />}
          {selectedEvent && tab === 'statistics' && (
            <StatisticsPanel event={selectedEvent} role={role} />
          )}
          {selectedEvent && tab === 'participants' && (
            <ParticipantsPanel event={selectedEvent} compact={isPanitia} />
          )}
          {selectedEvent && tab === 'program' && <ProgramPanel event={selectedEvent} />}
          {selectedEvent && tab === 'operations' && <OperationsPanel event={selectedEvent} />}
          {selectedEvent && tab === 'users' && <UsersPanel event={selectedEvent} />}
          {selectedEvent && tab === 'audit' && <AuditPanel event={selectedEvent} />}
        </div>
      </section>
    </main>
  );
}

function DashboardNavigation({ items, active, onChange }) {
  return (
    <nav className={styles.dashboardNav} aria-label='Navigasi dashboard'>
      <span className={styles.navLabel}>Workspace</span>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className={active === item.id ? styles.navActive : ''}
            aria-label={item.label}
            title={item.label}
            onClick={() => onChange(item.id)}
          >
            <Icon />
            <span>{item.label}</span>
            {active === item.id && <i />}
          </button>
        );
      })}
    </nav>
  );
}

function EventContext({ events, selectedEvent, onSelectEvent, compact = false }) {
  if (!selectedEvent) return null;

  if (compact) {
    return (
      <section className={`${styles.eventContext} ${styles.eventContextCompact}`}>
        <div className={styles.eventIdentity}>
          <span>Event penugasan</span>
          <strong>{selectedEvent.name}</strong>
        </div>
        <div className={styles.eventMeta}>
          <FiCalendar />
          <span>
            {formatDate(selectedEvent.starts_on)} - {formatDate(selectedEvent.ends_on)}
          </span>
        </div>
        {events.length > 1 ? (
          <label className={styles.eventSelect}>
            <span>Ganti event</span>
            <select
              value={selectedEvent.slug}
              onChange={(event) => onSelectEvent(event.target.value)}
            >
              {events.map((event) => (
                <option key={event.id} value={event.slug}>
                  {event.name}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <span className={styles.activeEventPill}>
            <i /> Event aktif
          </span>
        )}
      </section>
    );
  }

  return (
    <section className={styles.eventContext}>
      <div className={styles.eventIcon}>
        <FiCalendar />
      </div>
      <div className={styles.eventIdentity}>
        <span>Event aktif</span>
        <strong>{selectedEvent.name}</strong>
      </div>
      <div className={styles.eventMeta}>
        <FiClock />
        <span>
          {formatDate(selectedEvent.starts_on)} - {formatDate(selectedEvent.ends_on)}
        </span>
      </div>
      <div className={styles.eventMeta}>
        <FiMapPin />
        <span>{selectedEvent.venue}</span>
      </div>
      <label className={styles.eventSelect}>
        <span>Pilih event</span>
        <select value={selectedEvent.slug} onChange={(event) => onSelectEvent(event.target.value)}>
          {events.map((event) => (
            <option key={event.id} value={event.slug}>
              {event.name}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}

function StatisticsPanel({ event, role }) {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setStats(null);
    setError('');
    getStaffStatistics(event.slug, controller.signal)
      .then(setStats)
      .catch((apiError) => {
        if (apiError.name !== 'AbortError') setError(displayError(apiError));
      });
    return () => controller.abort();
  }, [event.slug]);

  if (error) return <Alert tone='error' message={error} />;
  if (!stats) return <LoadingState label='Memuat statistik event' />;

  const checkinRate = stats.summary.total_registrations
    ? Math.round((stats.summary.checked_in_participants / stats.summary.total_registrations) * 100)
    : 0;

  return (
    <section className={styles.panel}>
      <SectionHeader
        label={role === 'vendor' ? 'Aggregate insights' : 'Live overview'}
        title='Ringkasan performa event'
        description={
          role === 'vendor'
            ? 'Seluruh angka ditampilkan dalam bentuk agregat tanpa data pribadi peserta.'
            : 'Angka operasional terbaru untuk registrasi, check-in, dan program talkshow.'
        }
      />

      <div className={styles.metricGrid}>
        <MetricCard
          tone='red'
          icon={FiUsers}
          label='Total registrasi'
          value={stats.summary.total_registrations}
          note='Peserta terdaftar'
        />
        <MetricCard
          tone='green'
          icon={FiCheck}
          label='Terkonfirmasi'
          value={stats.summary.confirmed_registrations}
          note='Registrasi valid'
        />
        <MetricCard
          tone='blue'
          icon={FiActivity}
          label='Sudah check-in'
          value={stats.summary.checked_in_participants}
          note={`${checkinRate}% dari registrasi`}
        />
        <MetricCard
          tone='orange'
          icon={FiMic}
          label='Talkshow'
          value={stats.talkshows.length}
          note='Sesi dalam agenda'
        />
      </div>

      <div className={styles.insightGrid}>
        <DataCard label='Attendance flow' title='Kehadiran per hari' icon={FiBarChart2}>
          <AttendanceBars rows={stats.attendance_by_event_day} />
        </DataCard>
        <DataCard label='Check-in progress' title='Tingkat kehadiran' icon={FiActivity}>
          <div className={styles.rateVisual}>
            <div className={styles.rateRing} style={{ '--progress': `${checkinRate * 3.6}deg` }}>
              <strong>{checkinRate}%</strong>
              <span>check-in</span>
            </div>
            <div className={styles.rateCopy}>
              <strong>{stats.summary.checked_in_participants} peserta hadir</strong>
              <p>
                Dari total {stats.summary.total_registrations} registrasi yang tercatat untuk event
                ini.
              </p>
              <span>
                <i /> Data diperbarui dari aktivitas venue
              </span>
            </div>
          </div>
        </DataCard>
      </div>

      <DataCard label='Program performance' title='Statistik talkshow' icon={FiMic}>
        <SimpleTable
          headings={['Sesi', 'Kapasitas', 'Terkonfirmasi', 'Hadir', 'Okupansi']}
          rows={stats.talkshows.map((row) => {
            const occupancy = row.capacity
              ? Math.min(100, Math.round((row.confirmed_registrations / row.capacity) * 100))
              : null;
            return [
              <span className={styles.sessionName} key={row.talkshow_id}>
                <strong>{row.code}</strong>
                <small>{row.title}</small>
              </span>,
              row.capacity ?? 'Tak terbatas',
              row.confirmed_registrations,
              row.attendance,
              <StatusPill
                key={`occupancy-${row.talkshow_id}`}
                tone={occupancy !== null && occupancy >= 90 ? 'orange' : 'green'}
              >
                {occupancy === null ? 'Open' : `${occupancy}%`}
              </StatusPill>,
            ];
          })}
        />
      </DataCard>
    </section>
  );
}

function AttendanceBars({ rows }) {
  const max = Math.max(1, ...rows.map((row) => row.checked_in_participants));

  return (
    <div className={styles.attendanceBars}>
      {rows.map((row, index) => (
        <div className={styles.attendanceRow} key={row.event_day_id}>
          <span className={styles.dayIndex}>0{index + 1}</span>
          <span className={styles.dayCopy}>
            <strong>{row.label}</strong>
            <small>{formatDate(row.event_date, { year: undefined })}</small>
          </span>
          <span className={styles.barTrack}>
            <i style={{ width: `${(row.checked_in_participants / max) * 100}%` }} />
          </span>
          <strong className={styles.barValue}>{row.checked_in_participants}</strong>
        </div>
      ))}
    </div>
  );
}

function ParticipantsPanel({ event, compact = false }) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [searchDraft, setSearchDraft] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [selectedDayId, setSelectedDayId] = useState(event.days[0]?.id || '');
  const [checkinTarget, setCheckinTarget] = useState(null);
  const [checkingIn, setCheckingIn] = useState(false);
  const [downloadingTicketId, setDownloadingTicketId] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setPage(1);
    setPerPage(25);
    setSearchDraft('');
    setSearch('');
    setStatusFilter('all');
    setResult(null);
    setSelectedDayId(event.days[0]?.id || '');
    setCheckinTarget(null);
    setMessage('');
  }, [event.id, event.days]);

  useEffect(() => {
    const nextSearch = searchDraft.trim();
    if (nextSearch === search) return undefined;

    const debounceTimer = window.setTimeout(() => {
      setPage(1);
      setSearch(nextSearch);
    }, 450);

    return () => window.clearTimeout(debounceTimer);
  }, [search, searchDraft]);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setError('');
    setLoading(true);
    getStaffParticipants(
      event.slug,
      {
        page,
        perPage,
        search,
        checkinStatus: statusFilter,
        eventDayId: selectedDayId,
      },
      controller.signal
    )
      .then((response) => {
        if (!active) return;
        if (page > response.last_page) {
          setPage(Math.max(1, response.last_page));
          return;
        }
        setResult(response);
      })
      .catch((apiError) => {
        if (active && apiError.name !== 'AbortError') {
          setError('Tidak dapat memuat daftar peserta. Silakan coba lagi.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [event.slug, page, perPage, refreshKey, search, selectedDayId, statusFilter]);

  function submitSearch(submitEvent) {
    submitEvent.preventDefault();
    setPage(1);
    setSearch(searchDraft.trim());
  }

  async function confirmCheckin() {
    if (!checkinTarget || !selectedDayId) return;

    setCheckingIn(true);
    setError('');
    setMessage('');
    try {
      const response = await recordStaffParticipantCheckin(
        event.slug,
        selectedDayId,
        checkinTarget.id
      );
      setResult((current) => {
        if (!current) return current;

        return {
          ...current,
          data: current.data.map((row) => {
            if (row.id !== checkinTarget.id) return row;
            const alreadyPresent = row.daily_checkins.some(
              (checkin) => checkin.event_day_id === selectedDayId
            );
            if (alreadyPresent) return row;

            return {
              ...row,
              daily_checkins: [
                ...row.daily_checkins,
                {
                  event_day_id: selectedDayId,
                  checked_in_at: response.checkin.checked_in_at,
                },
              ],
            };
          }),
        };
      });
      setMessage(
        response.idempotent
          ? `${checkinTarget.participant.full_name} sudah check-in pada hari ini.`
          : `${checkinTarget.participant.full_name} berhasil di-check-in.`
      );
      setCheckinTarget(null);
      setRefreshKey((current) => current + 1);
    } catch (apiError) {
      setError(displayError(apiError));
      setCheckinTarget(null);
    } finally {
      setCheckingIn(false);
    }
  }

  async function downloadTicket(row) {
    setDownloadingTicketId(row.id);
    setError('');
    setMessage('');

    try {
      const file = await downloadStaffParticipantTicket(event.slug, row.id);
      const fileUrl = URL.createObjectURL(file);
      const link = document.createElement('a');
      const safeNumber = row.registration_number.replace(/[^a-z0-9._-]/gi, '_');
      link.href = fileUrl;
      link.download = `e-ticket-${safeNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
      setMessage(`Ticket ${row.participant.full_name} berhasil diunduh.`);
    } catch (apiError) {
      setError(displayError(apiError));
    } finally {
      setDownloadingTicketId('');
    }
  }

  const selectedDay = event.days.find((day) => day.id === selectedDayId);
  const resultFrom = result?.from ?? 0;
  const resultTo = result?.to ?? 0;

  return (
    <section className={styles.panel}>
      {!compact && (
        <SectionHeader
          label='Participant monitoring'
          title='Peserta & registrasi'
          description='Cari peserta terdaftar dan pantau status kehadirannya pada event ini.'
          action={
            result ? (
              <span className={styles.countPill}>
                {result.total.toLocaleString('id-ID')} peserta
              </span>
            ) : null
          }
        />
      )}
      <div className={styles.checkinDayBar}>
        <span className={styles.checkinDayIcon}>
          <FiCalendar />
        </span>
        <span className={styles.checkinDayCopy}>
          <small>Hari check-in aktif</small>
          <strong>{selectedDay?.label || 'Belum ada hari event'}</strong>
        </span>
        <label>
          <span>Pilih hari event</span>
          <select
            value={selectedDayId}
            onChange={(e) => {
              setPage(1);
              setSelectedDayId(e.target.value);
              setMessage('');
            }}
            disabled={!event.days.length}
          >
            {event.days.map((day) => (
              <option key={day.id} value={day.id}>
                {day.label} — {formatDate(day.event_date, { year: undefined })}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={styles.searchCard}>
        <form className={styles.searchForm} onSubmit={submitSearch} role='search'>
          <FiSearch />
          <input
            value={searchDraft}
            onChange={(e) => setSearchDraft(e.target.value)}
            placeholder='Cari nama, nomor registrasi, telepon, atau email'
            aria-label='Cari peserta'
          />
          <button className={styles.darkButton}>Cari</button>
        </form>
        <label className={styles.statusFilter}>
          <span>Status</span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
            disabled={!selectedDayId}
          >
            <option value='all'>Semua</option>
            <option value='not_checked_in'>Belum check-in</option>
            <option value='checked_in'>Sudah check-in</option>
          </select>
        </label>
        <span className={styles.searchHint}>Enter untuk mencari · pencarian otomatis aktif</span>
      </div>
      {error && <Alert tone='error' message={error} />}
      {message && <Alert tone='success' message={message} />}
      {!result && !error && <LoadingState label='Memuat peserta' />}
      {result && (
        <>
          <div className={styles.participantResultMeta} aria-live='polite'>
            <span>
              Menampilkan <strong>{resultFrom.toLocaleString('id-ID')}</strong>–
              <strong>{resultTo.toLocaleString('id-ID')}</strong> dari{' '}
              <strong>{result.total.toLocaleString('id-ID')}</strong> peserta
            </span>
            {loading && <span className={styles.queryActivity}>Memuat data terbaru…</span>}
          </div>
          <DataCard flush>
            {result.data.length === 0 ? (
              <EmptyState title='No participants found.' />
            ) : (
              <div className={styles.participantTableArea} aria-busy={loading}>
                {loading && (
                  <div className={styles.tableLoadingOverlay} role='status'>
                    <span />
                    Memuat peserta…
                  </div>
                )}
                <SimpleTable
                  sticky
                  compact
                  rowKeys={result.data.map((row) => row.id)}
                  headings={[
                    'No. registrasi',
                    'Peserta',
                    'Kontak',
                    'Organisasi',
                    'Status hari ini',
                    'Aksi',
                  ]}
                  rows={result.data.map((row) => {
                    const dayCheckin = row.daily_checkins.find(
                      (checkin) => checkin.event_day_id === selectedDayId
                    );
                    const checkedIn = Boolean(dayCheckin);

                    return [
                      <span className={styles.registrationNumber} key={`number-${row.id}`}>
                        {row.registration_number}
                      </span>,
                      <span
                        className={styles.participantName}
                        key={`name-${row.id}`}
                        title={row.participant.full_name}
                      >
                        <strong>{row.participant.full_name}</strong>
                        <small>{row.participant.city || '-'}</small>
                      </span>,
                      <span className={styles.contactCell} key={`contact-${row.id}`}>
                        <strong title={row.participant.whatsapp}>{row.participant.whatsapp}</strong>
                        <small title={row.participant.email}>{row.participant.email}</small>
                      </span>,
                      <span
                        className={styles.organizationCell}
                        title={row.participant.organization || '-'}
                        key={`organization-${row.id}`}
                      >
                        {row.participant.organization || '-'}
                      </span>,
                      <StatusPill key={`attendance-${row.id}`} tone={checkedIn ? 'green' : 'red'}>
                        {checkedIn
                          ? `Sudah check-in · ${formatTime(dayCheckin.checked_in_at, event.timezone)}`
                          : 'Belum check-in'}
                      </StatusPill>,
                      <div
                        className={`${styles.participantActions} ${
                          checkedIn ? styles.participantActionsChecked : ''
                        }`}
                        key={`action-${row.id}`}
                      >
                        {!checkedIn && (
                          <button
                            type='button'
                            className={styles.rowCheckinButton}
                            disabled={!selectedDayId}
                            onClick={() => {
                              setError('');
                              setMessage('');
                              setCheckinTarget(row);
                            }}
                          >
                            <FiCheckCircle />
                            Check-in
                          </button>
                        )}
                        <button
                          type='button'
                          className={styles.ticketDownloadButton}
                          disabled={downloadingTicketId === row.id}
                          aria-label={`Unduh e-ticket ${row.participant.full_name}`}
                          onClick={() => downloadTicket(row)}
                        >
                          <FiDownload />
                          {downloadingTicketId === row.id ? 'Menyiapkan…' : 'E-ticket'}
                        </button>
                      </div>,
                    ];
                  })}
                />
              </div>
            )}
            <Pagination
              current={result.current_page}
              last={result.last_page}
              perPage={perPage}
              disabled={loading}
              onChange={setPage}
              onPerPageChange={(nextPerPage) => {
                setPage(1);
                setPerPage(nextPerPage);
              }}
            />
          </DataCard>
        </>
      )}
      {checkinTarget && (
        <CheckinConfirmation
          participant={checkinTarget}
          day={selectedDay}
          submitting={checkingIn}
          onCancel={() => setCheckinTarget(null)}
          onConfirm={confirmCheckin}
        />
      )}
    </section>
  );
}

function CheckinConfirmation({ participant, day, submitting, onCancel, onConfirm }) {
  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape' && !submitting) onCancel();
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onCancel, submitting]);

  return (
    <div className={styles.modalBackdrop} role='presentation'>
      <div
        className={styles.checkinModal}
        role='dialog'
        aria-modal='true'
        aria-labelledby='checkin-confirmation-title'
      >
        <span className={styles.modalBrandBar} aria-hidden='true'>
          <i />
          <i />
          <i />
          <i />
        </span>
        <button
          type='button'
          className={styles.modalClose}
          aria-label='Tutup konfirmasi check-in'
          disabled={submitting}
          onClick={onCancel}
        >
          <FiX />
        </button>
        <div className={styles.modalContent}>
          <header className={styles.modalHeader}>
            <span className={styles.modalIcon}>
              <FiCheckCircle />
            </span>
            <div>
              <span className={styles.modalKicker}>Venue operations</span>
              <h2 id='checkin-confirmation-title'>Konfirmasi check-in</h2>
              <p>Periksa kembali peserta yang hadir sebelum menyimpan kehadiran.</p>
            </div>
          </header>
          <div className={styles.modalParticipant}>
            <div className={styles.modalParticipantIdentity}>
              <span>{participant.participant.full_name.slice(0, 1).toUpperCase()}</span>
              <div>
                <small>Peserta terdaftar</small>
                <strong>{participant.participant.full_name}</strong>
              </div>
            </div>
            <span className={styles.modalRegistration}>
              <small>No. registrasi</small>
              <strong>{participant.registration_number}</strong>
            </span>
          </div>
          <div className={styles.modalCheckpoint}>
            <div>
              <span>
                <FiCalendar />
              </span>
              <p>
                <small>Hari event</small>
                <strong>{day?.label || '-'}</strong>
              </p>
            </div>
            <div>
              <span>
                <FiClock />
              </span>
              <p>
                <small>Tanggal kehadiran</small>
                <strong>{day ? formatDate(day.event_date) : '-'}</strong>
              </p>
            </div>
          </div>
          <div className={styles.modalNotice}>
            <FiShield />
            <span>
              <strong>Konfirmasi kehadiran fisik</strong>
              <small>Tindakan ini akan tercatat atas nama akun Panitia yang sedang login.</small>
            </span>
          </div>
          <div className={styles.modalActions}>
            <button
              type='button'
              className={styles.modalCancel}
              disabled={submitting}
              onClick={onCancel}
            >
              Batal
            </button>
            <button
              type='button'
              className={styles.modalConfirm}
              disabled={submitting}
              onClick={onConfirm}
            >
              <FiCheckCircle />
              {submitting ? 'Mencatat kehadiran...' : 'Ya, check-in peserta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgramPanel({ event }) {
  return (
    <section className={styles.panel}>
      <SectionHeader
        label='Event management'
        title='Event & agenda talkshow'
        description='Ringkasan struktur hari event, venue, kapasitas, dan sesi talkshow yang sedang aktif.'
      />
      <article className={styles.programHero}>
        <div>
          <span className={styles.livePill}>
            <i /> Published event
          </span>
          <h2>{event.name}</h2>
          <p>
            <FiMapPin /> {event.venue}
          </p>
        </div>
        <dl>
          <div>
            <dt>Mulai</dt>
            <dd>{formatDate(event.starts_on)}</dd>
          </div>
          <div>
            <dt>Selesai</dt>
            <dd>{formatDate(event.ends_on)}</dd>
          </div>
          <div>
            <dt>Talkshow</dt>
            <dd>{event.talkshows.length} sesi</dd>
          </div>
        </dl>
      </article>
      <div className={styles.dayTimeline}>
        {event.days.map((day, index) => (
          <article key={day.id}>
            <span>0{index + 1}</span>
            <div>
              <small>{day.label}</small>
              <strong>{formatDate(day.event_date, { year: undefined })}</strong>
            </div>
            <i />
          </article>
        ))}
      </div>
      <DataCard label='Program schedule' title='Daftar talkshow' icon={FiMic}>
        <SimpleTable
          headings={['Kode', 'Judul sesi', 'Waktu', 'Kapasitas', 'Status']}
          rows={event.talkshows.map((talkshow) => [
            <span className={styles.talkshowCode} key={`code-${talkshow.id}`}>
              {talkshow.code}
            </span>,
            talkshow.title,
            new Intl.DateTimeFormat('id-ID', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            }).format(new Date(talkshow.starts_at)),
            talkshow.capacity ?? 'Tak terbatas',
            <StatusPill
              key={`status-${talkshow.id}`}
              tone={talkshow.status === 'published' ? 'green' : 'orange'}
            >
              {talkshow.status}
            </StatusPill>,
          ])}
        />
      </DataCard>
    </section>
  );
}

function OperationsPanel({ event }) {
  const [mode, setMode] = useState('daily');
  const [dayId, setDayId] = useState(event.days[0]?.id || '');
  const [talkshowId, setTalkshowId] = useState(event.talkshows[0]?.id || '');
  const [ticket, setTicket] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setDayId(event.days[0]?.id || '');
    setTalkshowId(event.talkshows[0]?.id || '');
    setResult(null);
  }, [event.id, event.days, event.talkshows]);

  async function submit(submitEvent) {
    submitEvent.preventDefault();
    setSubmitting(true);
    setError('');
    setResult(null);
    try {
      const response =
        mode === 'daily'
          ? await recordStaffDailyCheckin(event.slug, dayId, ticket.trim())
          : await recordStaffTalkshowAttendance(event.slug, talkshowId, ticket.trim());
      setResult(response);
      setTicket('');
    } catch (apiError) {
      setError(displayError(apiError));
    } finally {
      setSubmitting(false);
    }
  }

  const checkpoint =
    mode === 'daily'
      ? event.days.find((day) => day.id === dayId)?.label
      : event.talkshows.find((talkshow) => talkshow.id === talkshowId)?.code;

  return (
    <section className={styles.panel}>
      <SectionHeader
        label='Venue operations'
        title='QR scanner & check-in'
        description='Antarmuka cepat untuk scanner USB/Bluetooth pada laptop atau tablet meja registrasi.'
        action={
          <span className={styles.livePill}>
            <i /> Scanner ready
          </span>
        }
      />
      <div className={styles.operationsGrid}>
        <article className={styles.scannerCard}>
          <div className={styles.scannerHeader}>
            <span>
              <FiZap />
              <small>Checkpoint aktif</small>
              <strong>{checkpoint || 'Pilih checkpoint'}</strong>
            </span>
            <i />
          </div>
          <div className={styles.scannerBody}>
            <div className={styles.segmented}>
              <button
                type='button'
                className={mode === 'daily' ? styles.selected : ''}
                onClick={() => setMode('daily')}
              >
                <FiCalendar /> Event day
              </button>
              <button
                type='button'
                className={mode === 'talkshow' ? styles.selected : ''}
                onClick={() => setMode('talkshow')}
              >
                <FiMic /> Talkshow
              </button>
            </div>
            <form onSubmit={submit} className={styles.scannerForm}>
              {mode === 'daily' ? (
                <FormField label='Hari event'>
                  <select value={dayId} onChange={(e) => setDayId(e.target.value)}>
                    {event.days.map((day) => (
                      <option key={day.id} value={day.id}>
                        {day.label} - {formatDate(day.event_date, { year: undefined })}
                      </option>
                    ))}
                  </select>
                </FormField>
              ) : (
                <FormField label='Talkshow'>
                  <select value={talkshowId} onChange={(e) => setTalkshowId(e.target.value)}>
                    {event.talkshows.map((talkshow) => (
                      <option key={talkshow.id} value={talkshow.id}>
                        {talkshow.code} - {talkshow.title}
                      </option>
                    ))}
                  </select>
                </FormField>
              )}
              <FormField label='Hasil scan tiket' hint='QR URL atau token tiket'>
                <div className={styles.scanInput}>
                  <FiTag />
                  <input
                    autoFocus
                    value={ticket}
                    onChange={(e) => setTicket(e.target.value)}
                    required
                    placeholder='Pindai QR di sini...'
                  />
                </div>
              </FormField>
              <button className={styles.scanButton} disabled={submitting || !ticket.trim()}>
                <FiCheckCircle />
                <span>{submitting ? 'Memvalidasi tiket...' : 'Validasi & check-in'}</span>
              </button>
            </form>
            {error && <Alert tone='error' message={error} />}
            {result && (
              <div className={styles.scanSuccess}>
                <span>
                  <FiCheck />
                </span>
                <div>
                  <small>{result.idempotent ? 'Tiket sudah tercatat' : 'Check-in berhasil'}</small>
                  <strong>
                    {result.checkin?.registration_number || result.attendance?.registration_number}
                  </strong>
                </div>
              </div>
            )}
          </div>
        </article>

        <aside className={styles.operationGuide}>
          <span className={styles.guideIcon}>
            <FiActivity />
          </span>
          <span className={styles.sectionLabel}>Alur cepat</span>
          <h2>Siap untuk antrean venue.</h2>
          <ol>
            <li>
              <span>01</span>
              <p>
                <strong>Pilih checkpoint</strong>
                <small>Pastikan hari event atau sesi talkshow sudah benar.</small>
              </p>
            </li>
            <li>
              <span>02</span>
              <p>
                <strong>Arahkan scanner</strong>
                <small>Scanner akan mengisi kolom tiket secara otomatis.</small>
              </p>
            </li>
            <li>
              <span>03</span>
              <p>
                <strong>Validasi hasil</strong>
                <small>Status sukses atau duplikat langsung ditampilkan.</small>
              </p>
            </li>
          </ol>
          <div className={styles.keyboardHint}>
            <FiZap />
            <span>
              <strong>Venue tip</strong>
              <small>Gunakan scanner dalam mode keyboard + Enter untuk alur tercepat.</small>
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}

function UsersPanel({ event }) {
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'panitia' });
  const [assignUserId, setAssignUserId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    const [userPage, assignmentRows] = await Promise.all([
      getStaffUsers(),
      getEventAssignments(event.slug),
    ]);
    setUsers(userPage.data);
    setAssignments(assignmentRows);
  }, [event.slug]);

  useEffect(() => {
    setError('');
    reload().catch((apiError) => setError(displayError(apiError)));
  }, [reload]);

  const panitia = useMemo(
    () => users.filter((row) => row.roles[0]?.slug === 'panitia' && row.is_active),
    [users]
  );

  async function createUser(eventSubmit) {
    eventSubmit.preventDefault();
    setError('');
    setMessage('');
    try {
      await createStaffUser(form);
      setForm({ name: '', email: '', password: '', role: 'panitia' });
      setMessage('Pengguna berhasil dibuat.');
      await reload();
    } catch (apiError) {
      setError(displayError(apiError));
    }
  }

  async function toggleUser(row) {
    setError('');
    try {
      await updateStaffUser(row.id, { is_active: !row.is_active });
      await reload();
    } catch (apiError) {
      setError(displayError(apiError));
    }
  }

  async function changeRole(row, role) {
    setError('');
    try {
      await updateStaffUser(row.id, { role });
      await reload();
    } catch (apiError) {
      setError(displayError(apiError));
    }
  }

  async function assign(eventSubmit) {
    eventSubmit.preventDefault();
    if (!assignUserId) return;
    setError('');
    setMessage('');
    try {
      await assignPanitia(event.slug, assignUserId);
      setAssignUserId('');
      setMessage('Panitia berhasil ditugaskan.');
      await reload();
    } catch (apiError) {
      setError(displayError(apiError));
    }
  }

  async function unassign(id) {
    setError('');
    try {
      await unassignPanitia(event.slug, id);
      await reload();
    } catch (apiError) {
      setError(displayError(apiError));
    }
  }

  return (
    <section className={styles.panel}>
      <SectionHeader
        label='Access management'
        title='Tim, peran & penugasan'
        description='Kelola akses Super Admin, Panitia, dan Vendor tanpa mencampurkan batas kewenangannya.'
        action={<span className={styles.countPill}>{users.length} akun</span>}
      />
      {error && <Alert tone='error' message={error} />}
      {message && <Alert tone='success' message={message} />}
      <div className={styles.managementGrid}>
        <DataCard label='New account' title='Buat pengguna' icon={FiUserPlus}>
          <form onSubmit={createUser} className={styles.formStack}>
            <FormField label='Nama'>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder='Nama lengkap'
              />
            </FormField>
            <FormField label='Email'>
              <input
                type='email'
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder='nama@perusahaan.com'
              />
            </FormField>
            <FormField
              label='Password sementara'
              hint='Minimal 8 karakter, tanpa syarat kombinasi khusus'
            >
              <input
                type='password'
                minLength='8'
                autoComplete='new-password'
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </FormField>
            <FormField label='Role'>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value='panitia'>Panitia</option>
                <option value='vendor'>Vendor</option>
                <option value='super_admin'>Super Admin</option>
              </select>
            </FormField>
            <button className={styles.primaryButton}>
              <span>Buat pengguna</span>
              <FiArrowRight />
            </button>
          </form>
        </DataCard>
        <DataCard label='Event assignment' title='Panitia event' icon={FiUsers}>
          <p className={styles.cardDescription}>
            Tugaskan Panitia aktif khusus untuk <strong>{event.name}</strong>.
          </p>
          <form onSubmit={assign} className={styles.assignmentForm}>
            <select value={assignUserId} onChange={(e) => setAssignUserId(e.target.value)} required>
              <option value=''>Pilih Panitia</option>
              {panitia.map((row) => (
                <option key={row.id} value={row.id}>
                  {row.name}
                </option>
              ))}
            </select>
            <button className={styles.darkButton}>Tugaskan</button>
          </form>
          <div className={styles.assignmentList}>
            {assignments.length === 0 && (
              <p className={styles.inlineEmpty}>Belum ada Panitia yang ditugaskan.</p>
            )}
            {assignments.map((row) => (
              <div key={row.id}>
                <span className={styles.avatarSmall}>
                  {row.user.name.slice(0, 1).toUpperCase()}
                </span>
                <span>
                  <strong>{row.user.name}</strong>
                  <small>{row.user.email}</small>
                </span>
                <button type='button' onClick={() => unassign(row.id)}>
                  Cabut
                </button>
              </div>
            ))}
          </div>
        </DataCard>
      </div>
      <DataCard label='Staff directory' title='Akun staff' icon={FiShield} flush>
        <SimpleTable
          headings={['Pengguna', 'Email', 'Role', 'Status', 'Aksi']}
          rows={users.map((row) => [
            <span className={styles.userNameCell} key={`user-${row.id}`}>
              <span className={styles.avatarSmall}>{row.name.slice(0, 1).toUpperCase()}</span>
              <strong>{row.name}</strong>
            </span>,
            row.email,
            <select
              className={styles.tableSelect}
              key={`role-${row.id}`}
              value={row.roles[0]?.slug || ''}
              onChange={(e) => changeRole(row, e.target.value)}
            >
              <option value='panitia'>Panitia</option>
              <option value='vendor'>Vendor</option>
              <option value='super_admin'>Super Admin</option>
            </select>,
            <StatusPill key={`active-${row.id}`} tone={row.is_active ? 'green' : 'red'}>
              {row.is_active ? 'Aktif' : 'Nonaktif'}
            </StatusPill>,
            <button
              key={`toggle-${row.id}`}
              className={styles.textButton}
              onClick={() => toggleUser(row)}
            >
              {row.is_active ? 'Nonaktifkan' : 'Aktifkan'}
            </button>,
          ])}
        />
      </DataCard>
    </section>
  );
}

function AuditPanel({ event }) {
  const [logs, setLogs] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setLogs(null);
    setError('');
    getAuditLogs(event.id, controller.signal)
      .then(setLogs)
      .catch((apiError) => {
        if (apiError.name !== 'AbortError') setError(displayError(apiError));
      });
    return () => controller.abort();
  }, [event.id]);

  if (error) return <Alert tone='error' message={error} />;
  if (!logs) return <LoadingState label='Memuat audit log' />;

  return (
    <section className={styles.panel}>
      <SectionHeader
        label='Security trail'
        title='Audit aktivitas'
        description='Jejak tindakan administratif dan operasional penting untuk event terpilih.'
        action={<span className={styles.countPill}>{logs.total} aktivitas</span>}
      />
      <DataCard flush>
        <SimpleTable
          headings={['Waktu', 'Aktivitas', 'Aktor', 'Subjek']}
          rows={logs.data.map((row) => [
            <span className={styles.timeCell} key={`time-${row.id}`}>
              <FiClock /> {new Date(row.created_at).toLocaleString('id-ID')}
            </span>,
            <span className={styles.auditAction} key={`action-${row.id}`}>
              {row.action}
            </span>,
            row.actor?.name || 'System',
            <span className={styles.subjectId} key={`subject-${row.id}`}>
              {row.subject_id || '-'}
            </span>,
          ])}
        />
      </DataCard>
    </section>
  );
}

function SectionHeader({ label, title, description, action }) {
  return (
    <header className={styles.sectionHeader}>
      <div>
        <span className={styles.sectionLabel}>{label}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {action && <div className={styles.sectionAction}>{action}</div>}
    </header>
  );
}

function MetricCard({ label, value, note, tone, icon: Icon }) {
  return (
    <article
      className={`${styles.metricCard} ${styles[`metric${tone[0].toUpperCase()}${tone.slice(1)}`]}`}
    >
      <div className={styles.metricTop}>
        <span>
          <Icon />
        </span>
        <i />
      </div>
      <strong>{Number(value).toLocaleString('id-ID')}</strong>
      <h3>{label}</h3>
      <p>{note}</p>
    </article>
  );
}

function DataCard({ label, title, icon: Icon, children, flush = false }) {
  return (
    <article className={`${styles.dataCard} ${flush ? styles.dataCardFlush : ''}`}>
      {(label || title) && (
        <header className={styles.dataCardHeader}>
          <div>
            {Icon && (
              <span>
                <Icon />
              </span>
            )}
            <div>
              {label && <small>{label}</small>}
              {title && <h2>{title}</h2>}
            </div>
          </div>
        </header>
      )}
      <div className={styles.dataCardBody}>{children}</div>
    </article>
  );
}

function FormField({ label, hint, children }) {
  return (
    <label className={styles.formField}>
      <span>
        {label}
        {hint && <small>{hint}</small>}
      </span>
      {children}
    </label>
  );
}

function StatusPill({ tone = 'green', children }) {
  return (
    <span
      className={`${styles.statusPill} ${styles[`status${tone[0].toUpperCase()}${tone.slice(1)}`]}`}
    >
      <i />
      {children}
    </span>
  );
}

function SimpleTable({ headings, rows, rowKeys = [], sticky = false, compact = false }) {
  return (
    <div
      className={`${styles.tableWrap} ${sticky ? styles.tableSticky : ''} ${
        compact ? styles.tableCompact : ''
      }`}
    >
      <table>
        <thead>
          <tr>
            {headings.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={rowKeys[index] ?? index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function paginationItems(current, last) {
  if (last <= 7) return Array.from({ length: last }, (_, index) => index + 1);

  const visible = new Set([1, last, current - 1, current, current + 1]);
  if (current <= 4) [2, 3, 4, 5].forEach((page) => visible.add(page));
  if (current >= last - 3) {
    [last - 4, last - 3, last - 2, last - 1].forEach((page) => visible.add(page));
  }

  const pages = [...visible].filter((page) => page >= 1 && page <= last).sort((a, b) => a - b);
  const items = [];

  pages.forEach((page, index) => {
    if (index > 0 && page - pages[index - 1] > 1) items.push(`ellipsis-${page}`);
    items.push(page);
  });

  return items;
}

function Pagination({ current, last, perPage, onChange, onPerPageChange, disabled = false }) {
  if (last <= 1 && !onPerPageChange) return null;
  const items = paginationItems(current, last);

  return (
    <div className={styles.pagination}>
      {onPerPageChange && (
        <label className={styles.pageSizeControl}>
          <select
            value={perPage}
            disabled={disabled}
            onChange={(event) => onPerPageChange(Number(event.target.value))}
            aria-label='Jumlah peserta per halaman'
          >
            {[25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>peserta / halaman</span>
        </label>
      )}
      <nav className={styles.pageNumbers} aria-label='Navigasi halaman peserta'>
        <button
          type='button'
          className={styles.pageArrow}
          aria-label='Halaman sebelumnya'
          disabled={disabled || current <= 1}
          onClick={() => onChange(current - 1)}
        >
          <FiChevronLeft />
        </button>
        {items.map((item) =>
          typeof item === 'number' ? (
            <button
              type='button'
              key={item}
              className={item === current ? styles.pageActive : ''}
              aria-label={`Halaman ${item}`}
              aria-current={item === current ? 'page' : undefined}
              disabled={disabled}
              onClick={() => onChange(item)}
            >
              {item}
            </button>
          ) : (
            <span key={item} className={styles.pageEllipsis} aria-hidden='true'>
              …
            </span>
          )
        )}
        <button
          type='button'
          className={styles.pageArrow}
          aria-label='Halaman berikutnya'
          disabled={disabled || current >= last}
          onClick={() => onChange(current + 1)}
        >
          <FiChevronRight />
        </button>
      </nav>
    </div>
  );
}

function LoadingState({ label, fullscreen = false }) {
  return (
    <div className={`${styles.loadingState} ${fullscreen ? styles.loadingFullscreen : ''}`}>
      <span>
        <i />
        <i />
        <i />
        <i />
      </span>
      <p>{label}</p>
    </div>
  );
}

function EmptyState({ title }) {
  return (
    <div className={styles.emptyState}>
      <span>
        <FiGrid />
      </span>
      <h2>{title}</h2>
    </div>
  );
}

function Alert({ tone, message }) {
  return (
    <div
      className={`${styles.alert} ${tone === 'success' ? styles.alertSuccess : styles.alertError}`}
    >
      {tone === 'success' ? <FiCheckCircle /> : <FiShield />}
      <span>{message}</span>
    </div>
  );
}
