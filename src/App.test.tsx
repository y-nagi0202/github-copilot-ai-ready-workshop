import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App';

function renderApp(initialEntries: string[] = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
  );
}

describe('商品詳細ページ導線', () => {
  it('商品カードから詳細へ遷移し、一覧へ戻ると検索条件を保持する', () => {
    renderApp();

    fireEvent.change(screen.getByRole('searchbox', { name: '商品を検索' }), {
      target: { value: 'キャンプ' },
    });

    fireEvent.click(screen.getByRole('link', { name: /キャンプストーブ/ }));

    expect(screen.getByRole('heading', { name: 'キャンプストーブ' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: /一覧へ戻る/ }));

    expect(screen.getByRole('searchbox', { name: '商品を検索' })).toHaveValue('キャンプ');
    expect(screen.getByText('4 件の商品')).toBeInTheDocument();
  });

  it('存在しない商品 ID では一覧への戻り導線を表示する', () => {
    renderApp(['/product/999?q=キャンプ']);

    expect(
      screen.getByRole('heading', { name: '商品が見つかりませんでした' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /一覧へ戻る/ })).toHaveAttribute(
      'href',
      '/?q=キャンプ',
    );
  });
});
